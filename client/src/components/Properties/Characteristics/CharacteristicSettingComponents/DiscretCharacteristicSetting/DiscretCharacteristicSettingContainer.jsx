import React from "react";
import { connect } from "react-redux";
import withRouter from "../../../../Utils/WithRouter";
import { patchCharacteristicsData } from "../../../../../redux/characteristicsReducer";
import DiscretCharacteristicSetting from "./DiscretCharacteristicSetting";

class DiscretCharacteristicSettingContainer extends React.Component {
    patch (newValue) {
        this.props.patchCharacteristicsData(this.props.group, this.props.id, {value: newValue});
    }
    
    render () {
        return <DiscretCharacteristicSetting {...this.props.characteristicData} patch={this.patch.bind(this)} />;
    }
}

const createDiscretCharacteristicSettingContainer = (group, id) => {
    const mapStateToProps = state => ({
        characteristicData: state.characteristics.characteristicsData[group][id],
        demo: state.characteristics.demo,
        group: group,
        id: id,
    });

    const mapDispatchToProps = {
        patchCharacteristicsData, 
    };

    return connect(mapStateToProps, mapDispatchToProps)(withRouter(DiscretCharacteristicSettingContainer));
};

export default createDiscretCharacteristicSettingContainer;