import React from "react";
import { connect } from "react-redux";
import { patchContinuousSpread, patchPreferencesData } from "../../../../../redux/preferencesReducer";
import ContinuousPreferenceSettings from "./ContinuousPreferenceSettings";

class ContinuousPreferenceSettingsContainer extends React.Component {
    render () {
        return <ContinuousPreferenceSettings {...this.props.preferenceData} 
        patch={this.props.patch} 
        patchSpread={this.props.patchSpread} />;
    }
}

const createContinuousPreferenceSettingsContainer = (group, id) => {
    const mapStateToProps = state => ({
        preferenceData: state.preferences.preferencesData[group][id],
    });
    
    const mapDispatchToProps = {
        patch: newData => patchPreferencesData(group, id, newData), 
        patchSpread: (x, y) => patchContinuousSpread(group, id, x, y),
    };
    
    return connect(mapStateToProps, mapDispatchToProps)(ContinuousPreferenceSettingsContainer);
};

export default createContinuousPreferenceSettingsContainer;