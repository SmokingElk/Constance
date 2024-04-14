import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import BinaryCharacteristicSetting from "./BinaryCharacteristicSetting";
import withRouter from "../../../../Utils/WithRouter";
import { patchCharacteristicsData } from "../../../../../redux/characteristicsReducer";

class BinaryCharacteristicSettingsContainer extends React.Component {
    patch (newValue) {
        this.props.patchCharacteristicsData(this.props.group, this.props.id, {value: newValue});
    }

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
    };

    return connect(mapStateToProps, mapDispatchToProps)(withRouter(BinaryCharacteristicSettingsContainer));
};

export default createBinaryCharacteristicSettingsContainer;