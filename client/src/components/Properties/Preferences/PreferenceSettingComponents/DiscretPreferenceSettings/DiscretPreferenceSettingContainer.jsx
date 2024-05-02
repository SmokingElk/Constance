import React from "react";
import { connect } from "react-redux";
import { addPreferencesPatcher, deletePreferencesPatcher, patchDiscretCoef, patchPreferencesData } from "../../../../../redux/preferencesReducer";
import DiscretPreferenceSettings from "./DiscretPreferenceSettings";
import withRouter from "../../../../Utils/WithRouter.jsx";
import PreferenceSettingsContainer from "../PreferenceSettingContainer.jsx";

class DiscretPreferenceSettingsContainer extends PreferenceSettingsContainer {
    patchCoef (column, newValue) {
        this.props.patchDiscretCoef(this.props.group, this.props.id, column, newValue);
    
        if (this.props.demo) return;

        let columnsCoefs = (this.nextPatch.columnsCoefs ?? []).map(e => ({...e}));

        let variantOld = columnsCoefs.find(e => e.columnNumber === column);
        if (variantOld) variantOld.coef = newValue;
        else columnsCoefs.push({columnNumber: column, coef: newValue});

        this.requestPatch({
            ...this.nextPatch,
            columnsCoefs,
        });
    }

    render () {
        return <DiscretPreferenceSettings {...this.props.preferenceData} patch={this.patch.bind(this)} patchCoef={this.patchCoef.bind(this)} />;
    }
}

const createDiscretPreferenceSettingsContainer = (group, id) => {
    const mapStateToProps = state => ({
        preferenceData: state.preferences.preferencesData[group][id],
        demo: state.preferences.demo,
        group: group,
        id: id,
    });
    
    const mapDispatchToProps = {
        patchPreferencesData, 
        patchDiscretCoef,
        addPreferencesPatcher,
        deletePreferencesPatcher,
    };
    
    return connect(mapStateToProps, mapDispatchToProps)(withRouter(DiscretPreferenceSettingsContainer));
};

export default createDiscretPreferenceSettingsContainer;