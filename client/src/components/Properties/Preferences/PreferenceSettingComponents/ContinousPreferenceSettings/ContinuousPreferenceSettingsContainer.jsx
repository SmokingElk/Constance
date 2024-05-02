import React from "react";
import { connect } from "react-redux";
import { addPreferencesPatcher, deletePreferencesPatcher, patchContinuousSpread, patchPreferencesData } from "../../../../../redux/preferencesReducer";
import ContinuousPreferenceSettings from "./ContinuousPreferenceSettings";
import withRouter from "../../../../Utils/WithRouter.jsx";
import PreferenceSettingsContainer from "../PreferenceSettingContainer.jsx";

class ContinuousPreferenceSettingsContainer extends PreferenceSettingsContainer {
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