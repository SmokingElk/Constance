import React from "react";
import { connect } from "react-redux";
import Preferences from "./Preferences";
import axios from "axios";
import { createPreferencesData, initPreferencesData, setPossibleGroups } from "../../../redux/preferencesReducer";

class PreferencesContainer extends React.Component {
    componentDidMount () {
        axios.get("http://localhost:5000/static/properties_data.json").then(res => {
            this.props.setPossibleGroups(res.data.globalParams.groups);
            this.props.initPreferencesData(createPreferencesData(res.data));
            debugger;
        });
    }

    render () {
        return <Preferences {...this.props} />
    }
}

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = {
    setPossibleGroups,
    initPreferencesData,
};

export default connect(mapStateToProps, mapDispatchToProps)(PreferencesContainer);