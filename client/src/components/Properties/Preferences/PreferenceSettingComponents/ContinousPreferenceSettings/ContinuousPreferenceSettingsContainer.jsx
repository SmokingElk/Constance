import React from "react";
import { connect } from "react-redux";
import { patchContinuousSpread, patchPreferencesData } from "../../../../../redux/preferencesReducer";
import ContinuousPreferenceSettings from "./ContinuousPreferenceSettings";
import axios from "axios";
import { getJWT } from "../../../../../global_logic/userEnter.js";
import withRouter from "../../../../Utils/WithRouter.jsx";

class ContinuousPreferenceSettingsContainer extends React.Component {
    patch (newData) {
        this.props.patchPreferencesData(this.props.group, this.props.id, newData);
        
        if (this.props.demo) return;

        axios.put("http://localhost:5000/api/v1/prefs/patch_pref", {
            jwtToken: getJWT(),
            id: this.props.id,
            patch: newData,
        }).catch(error => {
            let status = error.response.status;
            if (status === 400) return;
            if (status === 401) this.props.router.navigate("/login");
            if (status === 404) this.props.router.navigate("/login");
        });
    }

    patchSpread (x, y) {
        this.props.patchContinuousSpread(this.props.group, this.props.id, x, y);
    
        if (this.props.demo) return;

        axios.put("http://localhost:5000/api/v1/prefs/patch_pref", {
            jwtToken: getJWT(),
            id: this.props.id,
            patch: {
                point: { x, y },
            },
        }).catch(error => {
            let status = error.response.status;
            if (status === 400) return;
            if (status === 401) this.props.router.navigate("/login");
            if (status === 404) this.props.router.navigate("/login");
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
    };

    return connect(mapStateToProps, mapDispatchToProps)(withRouter(ContinuousPreferenceSettingsContainer));
};

export default createContinuousPreferenceSettingsContainer;