import React from "react";
import { connect } from "react-redux";
import { patchPreferencesData } from "../../../../../redux/preferencesReducer";
import BinaryPreferenceSettings from "./BinaryPreferenceSettings";
import axios from "axios";
import { getJWT } from "../../../../../global_logic/userEnter";
import withRouter from "../../../../Utils/WithRouter";

class BinaryPreferenceSettingsContainer extends React.Component {
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
    };
    
    return connect(mapStateToProps, mapDispatchToProps)(withRouter(BinaryPreferenceSettingsContainer));
};

export default createBinaryPreferenceSettingsContainer;