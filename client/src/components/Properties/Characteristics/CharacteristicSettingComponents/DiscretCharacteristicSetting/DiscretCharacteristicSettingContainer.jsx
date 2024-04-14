import React from "react";
import { connect } from "react-redux";
import withRouter from "../../../../Utils/WithRouter";
import { patchCharacteristicsData } from "../../../../../redux/characteristicsReducer";
import DiscretCharacteristicSetting from "./DiscretCharacteristicSetting";
import { getJWT } from "../../../../../global_logic/userEnter";
import axios from "axios";

class DiscretCharacteristicSettingContainer extends React.Component {
    patch (newValue) {
        this.props.patchCharacteristicsData(this.props.group, this.props.id, {value: newValue});

        if (this.props.demo) return;

        axios.put("http://localhost:5000/api/v1/prefs/patch_pref", {
            jwtToken: getJWT(),
            id: this.props.id,
            value: newValue,
        }).catch(error => {
            let status = error.response.status;
            if (status === 400) return;
            if (status === 401) this.props.router.navigate("/login");
            if (status === 404) this.props.router.navigate("/login");
        });
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