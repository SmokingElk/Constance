import React from "react";
import { connect } from "react-redux";
import Preferences from "./Preferences";
import axios from "axios";
import { createPreferencesData, initPreferencesData, patchPreferencesData, setPossibleGroups } from "../../../redux/preferencesReducer";

class PreferencesContainer extends React.Component {
    componentDidMount () {
        axios.get("http://localhost:5000/static/properties_data.json").then(res => {
            this.props.setPossibleGroups(res.data.globalParams.groups);
            this.props.initPreferencesData(createPreferencesData(res.data));
        });
    }

    render () {
        return <Preferences {...this.props} />
    }
}

const mapStateToProps = state => ({
    sex: state.entered.sex ? "male" : "female",
    preferencesData: state.preferences.preferencesData,
});

const mapDispatchToProps = {
    setPossibleGroups,
    initPreferencesData,
    patchPreferencesData,
};

export default connect(mapStateToProps, mapDispatchToProps)(PreferencesContainer);