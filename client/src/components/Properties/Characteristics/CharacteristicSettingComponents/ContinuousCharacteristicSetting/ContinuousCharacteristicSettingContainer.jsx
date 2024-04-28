import React from "react";
import ContinuousCharacteristicSetting from "./ContinuousCharacteristicSetting";
import { connect } from "react-redux";
import withRouter from "../../../../Utils/WithRouter";
import { addCharacteristicsPatcher, deleteCharacteristicsPatcher, patchCharacteristicsData } from "../../../../../redux/characteristicsReducer";
import { getJWT } from "../../../../../global_logic/userEnter";
import axios from "axios";

class ContinuousCharacteristicSettingContainer extends React.Component {
    updateTimerId = -1;

    patch (newValue) {
        this.props.patchCharacteristicsData(this.props.group, this.props.id, {value: newValue});

        this.props.addCharacteristicsPatcher(this.props.id);

        if (this.props.demo) return;

        clearTimeout(this.updateTimerId);

        this.updateTimerId = setTimeout(() => {
            this.updateTimerId = -1;
            let value = newValue;

            axios.put("http://localhost:5000/api/v1/chars/patch_chars", {
                jwtToken: getJWT(),
                id: this.props.id,
                value: value,
            }).catch(error => {
                let status = error?.response?.status ?? -1;
                if (status === 400) return;
                if (status === 401) this.props.router.navigate("/login");
                if (status === 404) this.props.router.navigate("/login");
            }).finally(() => {
                if (this.updateTimerId === -1) this.props.deleteCharacteristicsPatcher(this.props.id);
            });
        }, 3000);
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
        addCharacteristicsPatcher,
        deleteCharacteristicsPatcher,
    };

    return connect(mapStateToProps, mapDispatchToProps)(withRouter(ContinuousCharacteristicSettingContainer));
};

export default createContinuousCharacteristicSettingContainer;