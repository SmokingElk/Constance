import React from "react";
import { connect } from "react-redux";
import { patchDiscretCoef, patchPreferencesData } from "../../../../../redux/preferencesReducer";
import DiscretPreferenceSettings from "./DiscretPreferenceSettings";
import axios from "axios";
import { getJWT } from "../../../../../global_logic/userEnter.js";
import withRouter from "../../../../Utils/WithRouter.jsx";

class DiscretPreferenceSettingsContainer extends React.Component {
    patch (newData) {
        this.props.patchPreferencesData(this.props.group, this.props.id, newData);
        
        if (this.props.demo) return;

        axios.put("http://localhost:5000/api/v1/prefs/patch_pref", {
            jwtToken: getJWT(),
            id: this.props.id,
            patch: newData,
        }).catch(error => {
            let status = error.response.status;
            if (status === 400) return;
            if (status === 401) this.props.router.navigate("/login");
            if (status === 404) this.props.router.navigate("/login");
        });
    }

    patchCoef (column, newValue) {
        this.props.patchDiscretCoef(this.props.group, this.props.id, column, newValue);
    
        if (this.props.demo) return;

        axios.put("http://localhost:5000/api/v1/prefs/patch_pref", {
            jwtToken: getJWT(),
            id: this.props.id,
            patch: {
                columnCoef: {
                    columnNumber: column,
                    coef: newValue,
                }
            },
        }).catch(error => {
            let status = error.response.status;
            if (status === 400) return;
            if (status === 401) this.props.router.navigate("/login");
            if (status === 404) this.props.router.navigate("/login");
        });
    }

    render () {
        return <DiscretPreferenceSettings {...this.props.preferenceData} patch={this.patch.bind(this)} patchCoef={this.patchCoef.bind(this)} />;
    }
}

const createDiscretPreferenceSettingsContainer = (group, id) => {
    const mapStateToProps = state => ({
        preferenceData: state.preferences.preferencesData[group][id],
        demo: state.preferences.demo,
        group: group,
        id: id,
    });
    
    const mapDispatchToProps = {
        patchPreferencesData, 
        patchDiscretCoef,
    };
    
    return connect(mapStateToProps, mapDispatchToProps)(withRouter(DiscretPreferenceSettingsContainer));
};

export default createDiscretPreferenceSettingsContainer;