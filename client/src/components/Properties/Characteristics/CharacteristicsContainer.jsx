import React from "react";
import Characteristics from "./Characteristics";
import { connect } from "react-redux";
import { createCharacteristicsData, initCharacteristicsData, loadCharacteristicsData, setPossibleCharacteristicsGroups } from "../../../redux/characteristicsReducer";
import axios from "axios";
import withRouter from "../../Utils/WithRouter";
import { getJWT } from "../../../global_logic/userEnter";

class CharacteristicsContainer extends React.Component {
    componentDidMount () {
        axios.get("http://localhost:5000/static/properties_data.json").then(res => {
            this.props.setPossibleCharacteristicsGroups(res.data.globalParams.groups);
            this.props.initCharacteristicsData(createCharacteristicsData(res.data));
        });

        if (this.props.demo) return;

        axios.get("http://localhost:5000/api/v1/chars/get_all", {
            params: { jwtToken: getJWT() }
        }).then(res => {
            this.props.loadCharacteristicsData(res.data);
        }).catch(error => {
            let status = error.response.status;
            if (status === 401) this.props.router.navigate("/login");
            if (status === 404) this.props.router.navigate("/login");
        });
    }

    render () {
        return <Characteristics {...this.props} />;
    }
}

const mapStateToProps = state => ({
    sex: state.entered.sex,
    demo: state.characteristics.demo,
    characteristicsTree: state.characteristics.characteristicsTree,
});

const mapDispatchToProps = {
    setPossibleCharacteristicsGroups,
    initCharacteristicsData,
    loadCharacteristicsData,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CharacteristicsContainer));