import React from "react";
import { connect } from "react-redux";
import { addPreferencesPatcher, deletePreferencesPatcher, patchPreferencesData } from "../../../../../redux/preferencesReducer";
import BinaryPreferenceSettings from "./BinaryPreferenceSettings";
import axios from "axios";
import { getJWT } from "../../../../../global_logic/userEnter";
import withRouter from "../../../../Utils/WithRouter";

class BinaryPreferenceSettingsContainer extends React.Component {
    updateTimerId = -1;
    nextPatch = {};
    
    patch (newData) {
        this.props.patchPreferencesData(this.props.group, this.props.id, newData);

        this.props.addPreferencesPatcher(this.props.id);

        if (this.props.demo) return;

        clearTimeout(this.updateTimerId);

        this.nextPatch = {
            ...this.nextPatch,
            ...newData,
        };

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
    
    render () {
        return <BinaryPreferenceSettings {...this.props.preferenceData} patch={this.patch.bind(this)} />
    }
}

const createBinaryPreferenceSettingsContainer = (group, id) => {
    const mapStateToProps = state => ({
        preferenceData: state.preferences.preferencesData[group][id],
        demo: state.preferences.demo,
        group: group,
        id: id,
    });
    
    const mapDispatchToProps = {
        patchPreferencesData,    
        addPreferencesPatcher,
        deletePreferencesPatcher,
    };

    return connect(mapStateToProps, mapDispatchToProps)(withRouter(BinaryPreferenceSettingsContainer));
};

export default createBinaryPreferenceSettingsContainer;