import React from "react";
import { connect } from "react-redux";
import Preferences from "./Preferences";
import axios from "axios";
import { createPreferencesData, initPreferencesData, loadPreferencesData, setPossiblePreferencesGroups, setPreferencesFetching, } from "../../../redux/preferencesReducer";
import { getJWT } from "../../../global_logic/userEnter.js";
import withRouter from "../../Utils/WithRouter.jsx";

class PreferencesContainer extends React.Component {
    componentDidMount () {
        axios.get("http://localhost:5000/static/properties_data.json").then(res => {
            this.props.setPossiblePreferencesGroups(res.data.globalParams.groups);
            this.props.initPreferencesData(createPreferencesData(res.data));
        });

        if (this.props.demo) return;

        this.props.setPreferencesFetching(true);

        axios.get("http://localhost:5000/api/v1/prefs/get_all", {
            params: { jwtToken: getJWT() },
        }).then(res => {
            this.props.loadPreferencesData(res.data);
        }).catch(error => {
            let status = error?.response?.status ?? -1;
            if (status === 401) this.props.router.navigate("/login");
            if (status === 404) this.props.router.navigate("/login");
        }).finally(() => {
            this.props.setPreferencesFetching(false);
        });
    }

    render () {
        return <Preferences {...this.props} />
    }
}

const mapStateToProps = state => ({
    sex: state.entered.sex,
    preferencesTree: state.preferences.preferencesTree,
    demo: state.preferences.demo,
    isFetching: state.preferences.isFetching,
});

const mapDispatchToProps = {
    setPossiblePreferencesGroups,
    initPreferencesData,
    loadPreferencesData,    
    setPreferencesFetching,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PreferencesContainer));