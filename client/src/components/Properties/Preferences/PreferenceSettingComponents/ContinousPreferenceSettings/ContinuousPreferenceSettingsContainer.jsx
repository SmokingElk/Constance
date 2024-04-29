import React from "react";
import { connect } from "react-redux";
import { addPreferencesPatcher, deletePreferencesPatcher, patchContinuousSpread, patchPreferencesData } from "../../../../../redux/preferencesReducer";
import ContinuousPreferenceSettings from "./ContinuousPreferenceSettings";
import axios from "axios";
import { getJWT } from "../../../../../global_logic/userEnter.js";
import withRouter from "../../../../Utils/WithRouter.jsx";

class ContinuousPreferenceSettingsContainer extends React.Component {
    updateTimerId = -1;
    nextPatch = {};

    requestPatch (nextPatch) {
        if (this.props.demo) return;

        this.props.addPreferencesPatcher(this.props.id);

        clearTimeout(this.updateTimerId);

        this.nextPatch = nextPatch;

        this.updateTimerId = setTimeout(() => {
            this.updateTimerId = -1;
            let patchData = {...this.nextPatch};
            this.nextPatch = {};

            axios.put("http://localhost:5000/api/v1/prefs/patch_pref", {
                jwtToken: getJWT(),
                id: Number(this.props.id),
                patch: patchData,
            }).catch(error => {
                let status = error?.response?.status ?? -1;
                if (status === 400) return;
                if (status === 401) this.props.router.navigate("/login");
                if (status === 404) this.props.router.navigate("/login");
            }).finally(() => {
                if (this.updateTimerId === -1) this.props.deletePreferencesPatcher(this.props.id);
            });
        }, 3000);
    }

    patch (newData) {
        this.props.patchPreferencesData(this.props.group, this.props.id, newData);

        this.requestPatch({
            ...this.nextPatch,
            ...newData,
        });
    }

    patchSpread (x, y) {
        this.props.patchContinuousSpread(this.props.group, this.props.id, x, y);
    
        if (this.props.demo) return;

        let points = (this.nextPatch.points ?? []).map(e => ({...e}));

        let pointOld = points.find(e => e.x === x);
        if (pointOld) pointOld.y = y;
        else points.push({x, y});

        this.requestPatch({
            ...this.nextPatch,
            points,
        });
    }
    
    render () {
        return <ContinuousPreferenceSettings {...this.props.preferenceData} 
        patch={this.patch.bind(this)} 
        patchSpread={this.patchSpread.bind(this)} />;
    }
}

const createContinuousPreferenceSettingsContainer = (group, id) => {
    const mapStateToProps = state => ({
        preferenceData: state.preferences.preferencesData[group][id],
        demo: state.preferences.demo,
        group: group,
        id: id,
    });
    
    const mapDispatchToProps = {
        patchPreferencesData,
        patchContinuousSpread,
        addPreferencesPatcher,
        deletePreferencesPatcher,
    };

    return connect(mapStateToProps, mapDispatchToProps)(withRouter(ContinuousPreferenceSettingsContainer));
};

export default createContinuousPreferenceSettingsContainer;