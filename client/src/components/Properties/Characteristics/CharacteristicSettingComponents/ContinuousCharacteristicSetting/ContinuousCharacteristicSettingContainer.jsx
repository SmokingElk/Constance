import React from "react";
import ContinuousCharacteristicSetting from "./ContinuousCharacteristicSetting";
import { connect } from "react-redux";
import withRouter from "../../../../Utils/WithRouter";
import { patchCharacteristicsData } from "../../../../../redux/characteristicsReducer";

class ContinuousCharacteristicSettingContainer extends React.Component {
    patch (newValue) {
        this.props.patchCharacteristicsData(this.props.group, this.props.id, {value: newValue});
    }
    
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
    };

    return connect(mapStateToProps, mapDispatchToProps)(withRouter(ContinuousCharacteristicSettingContainer));
};

export default createContinuousCharacteristicSettingContainer;