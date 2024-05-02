import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import BinaryCharacteristicSetting from "./BinaryCharacteristicSetting";
import withRouter from "../../../../Utils/WithRouter";
import { addCharacteristicsPatcher, deleteCharacteristicsPatcher, patchCharacteristicsData } from "../../../../../redux/characteristicsReducer";
import { getJWT } from "../../../../../global_logic/userEnter";
import CharacteristicSettingsContainer from "../CharacteristicSettingContainer";

class BinaryCharacteristicSettingsContainer extends CharacteristicSettingsContainer {
    render () {
        return <BinaryCharacteristicSetting {...this.props.characteristicData} patch={this.patch.bind(this)} />;
    }
}

const createBinaryCharacteristicSettingsContainer = (group, id) => {
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

    return connect(mapStateToProps, mapDispatchToProps)(withRouter(BinaryCharacteristicSettingsContainer));
};

export default createBinaryCharacteristicSettingsContainer;