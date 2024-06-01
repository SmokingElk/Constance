import React from "react";
import ContinuousCharacteristicSetting from "./ContinuousCharacteristicSetting";
import { connect } from "react-redux";
import withRouter from "../../../../Utils/WithRouter";
import { addCharacteristicsPatcher, deleteCharacteristicsPatcher, patchCharacteristicsData } from "../../../../../redux/characteristicsReducer";
import CharacteristicSettingsContainer from "../CharacteristicSettingContainer";

/*
Компонент-обертка, для взаимодействия ContinuousCharacteristicSetting с redux-store и сервером.
Логика обновления реализуется в CharacteristicSettingsContainer, данный тип характеристики не требует доп. логики.
Компонент создан для единообразия структуры. 
 */

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