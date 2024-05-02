import React from "react";
import { connect } from "react-redux";
import { addPreferencesPatcher, deletePreferencesPatcher, patchPreferencesData } from "../../../../../redux/preferencesReducer";
import BinaryPreferenceSettings from "./BinaryPreferenceSettings";
import axios from "axios";
import { getJWT } from "../../../../../global_logic/userEnter";
import withRouter from "../../../../Utils/WithRouter";
import PreferenceSettingsContainer from "../PreferenceSettingContainer";

class BinaryPreferenceSettingsContainer extends PreferenceSettingsContainer {
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