import React from "react";
import { connect } from "react-redux";
import { patchPreferencesData } from "../../../../../redux/preferencesReducer";
import ContinuousPreferenceSettings from "./ContinuousPreferenceSettings";

class ContinuousPreferenceSettingsContainer extends React.Component {
    render () {
        return <ContinuousPreferenceSettings {...this.props.preferenceData} patch={this.props.patch} />
    }
}

const createContinuousPreferenceSettingsContainer = (group, id) => {
    const mapStateToProps = state => ({
        preferenceData: state.preferences.preferencesData[group][id],
    });
    
    const mapDispatchToProps = {
        patch: newData => patchPreferencesData(group, id, newData), 
    };
    
    return connect(mapStateToProps, mapDispatchToProps)(ContinuousPreferenceSettingsContainer);
};

export default createContinuousPreferenceSettingsContainer;