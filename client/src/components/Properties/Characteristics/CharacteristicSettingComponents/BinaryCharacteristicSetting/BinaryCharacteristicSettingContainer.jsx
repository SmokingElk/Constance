import React from "react";
import { connect } from "react-redux";
import BinaryCharacteristicSetting from "./BinaryCharacteristicSetting";
import withRouter from "../../../../Utils/WithRouter";
import {
    addCharacteristicsPatcher,
    deleteCharacteristicsPatcher,
    patchCharacteristicsData,
} from "../../../../../redux/characteristicsReducer";
import CharacteristicSettingsContainer from "../CharacteristicSettingContainer";

/*
Компонент-обертка, для взаимодействия BinaryCharacteristicSettings с redux-store и сервером.
Логика обновления реализуется в CharacteristicSettingsContainer, данный тип характеристики не требует доп. логики.
Компонент создан для единообразия структуры. 
 */

class BinaryCharacteristicSettingsContainer extends CharacteristicSettingsContainer {
    render() {
        return (
            <BinaryCharacteristicSetting
                {...this.props.characteristicData}
                patch={this.patch.bind(this)}
            />
        );
    }
}

const createBinaryCharacteristicSettingsContainer = (group, id) => {
    const mapStateToProps = (state) => ({
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

    return connect(
        mapStateToProps,
        mapDispatchToProps,
    )(withRouter(BinaryCharacteristicSettingsContainer));
};

export default createBinaryCharacteristicSettingsContainer;
