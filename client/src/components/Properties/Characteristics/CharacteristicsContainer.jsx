import React from "react";
import Characteristics from "./Characteristics";
import { connect } from "react-redux";
import { createCharacteristicsData, initCharacteristicsData, setPossibleCharacteristicsGroups } from "../../../redux/characteristicsReducer";
import axios from "axios";
import withRouter from "../../Utils/WithRouter";

class CharacteristicsContainer extends React.Component {
    componentDidMount () {
        axios.get("http://localhost:5000/static/properties_data.json").then(res => {
            this.props.setPossibleCharacteristicsGroups(res.data.globalParams.groups);
            this.props.initCharacteristicsData(createCharacteristicsData(res.data));
        });

        if (this.props.demo) return;
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
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CharacteristicsContainer));