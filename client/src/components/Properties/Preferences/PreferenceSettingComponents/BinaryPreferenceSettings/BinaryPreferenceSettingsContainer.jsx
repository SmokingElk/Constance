import React from "react";
import { connect } from "react-redux";
import { patchPreferencesData } from "../../../../../redux/preferencesReducer";
import BinaryPreferenceSettings from "./BinaryPreferenceSettings";

class BinaryPreferenceSettingsContainer extends React.Component {
    render () {
        return <BinaryPreferenceSettings {...this.props.preferenceData} patch={this.props.patch} />
    }
}

const createBinaryPreferenceSettingsContainer = (group, id) => {
    const mapStateToProps = state => ({
        preferenceData: state.preferences.preferencesData[group][id],
    });
    
    const mapDispatchToProps = {
        patch: newData => patchPreferencesData(group, id, newData), 
    };
    
    return connect(mapStateToProps, mapDispatchToProps)(BinaryPreferenceSettingsContainer);
};

export default createBinaryPreferenceSettingsContainer;