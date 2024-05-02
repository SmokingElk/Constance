import React from "react";
import ContinuousCharacteristicSetting from "./ContinuousCharacteristicSetting";
import { connect } from "react-redux";
import withRouter from "../../../../Utils/WithRouter";
import { addCharacteristicsPatcher, deleteCharacteristicsPatcher, patchCharacteristicsData } from "../../../../../redux/characteristicsReducer";
import { getJWT } from "../../../../../global_logic/userEnter";
import axios from "axios";
import CharacteristicSettingsContainer from "../CharacteristicSettingContainer";

class ContinuousCharacteristicSettingContainer extends CharacteristicSettingsContainer {
    render () {
        return <ContinuousCharacteristicSetting {...this.props.characteristicData} patch={this.patch.bind(this)} />;
    }
}

const createContinuousCharacteristicSettingContainer = (group, id) => {
    const mapStateToProps = state => ({
        characteristicData: state.characteristics.characteristicsData[group][id],
        demo: state.characteristics.demo,
        group: group,
        id: id,
    });

    const mapDispatchToProps = {
        patchCharacteristicsData, 
        addCharacteristicsPatcher,
        deleteCharacteristicsPatcher,
    };

    return connect(mapStateToProps, mapDispatchToProps)(withRouter(ContinuousCharacteristicSettingContainer));
};

export default createContinuousCharacteristicSettingContainer;