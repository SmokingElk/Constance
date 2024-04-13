import React from "react";
import { connect } from "react-redux";
import { patchDiscretCoef, patchPreferencesData } from "../../../../../redux/preferencesReducer";
import DiscretPreferenceSettings from "./DiscretPreferenceSettings";

class DiscretPreferenceSettingsContainer extends React.Component {
    render () {
        return <DiscretPreferenceSettings {...this.props.preferenceData} patch={this.props.patch} patchCoef={this.props.patchCoef} />;
    }
}

const createDiscretPreferenceSettingsContainer = (group, id) => {
    const mapStateToProps = state => ({
        preferenceData: state.preferences.preferencesData[group][id],
    });
    
    const mapDispatchToProps = {
        patch: newData => patchPreferencesData(group, id, newData), 
        patchCoef: (column, newValue) => patchDiscretCoef(group, id, column, newValue),
    };
    
    return connect(mapStateToProps, mapDispatchToProps)(DiscretPreferenceSettingsContainer);
};

export default createDiscretPreferenceSettingsContainer;