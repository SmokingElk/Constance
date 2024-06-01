import React from "react";
import { connect } from "react-redux";
import withRouter from "../../../../Utils/WithRouter";
import {
    addCharacteristicsPatcher,
    deleteCharacteristicsPatcher,
    patchCharacteristicsData,
} from "../../../../../redux/characteristicsReducer";
import DiscretCharacteristicSetting from "./DiscretCharacteristicSetting";
import CharacteristicSettingsContainer from "../CharacteristicSettingContainer";

/*
Компонент-обертка, для взаимодействия DiscretCharacteristicSetting с redux-store и сервером.
Логика обновления реализуется в CharacteristicSettingsContainer, данный тип характеристики не требует доп. логики.
Компонент создан для единообразия структуры. 
 */

class DiscretCharacteristicSettingContainer extends CharacteristicSettingsContainer {
    render() {
        return (
            <DiscretCharacteristicSetting
                {...this.props.characteristicData}
                patch={this.patch.bind(this)}
            />
        );
    }
}

const createDiscretCharacteristicSettingContainer = (group, id) => {
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
    )(withRouter(DiscretCharacteristicSettingContainer));
};

export default createDiscretCharacteristicSettingContainer;
