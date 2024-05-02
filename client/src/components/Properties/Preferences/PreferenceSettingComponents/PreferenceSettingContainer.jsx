import React from "react";
import axios from "axios";
import { getJWT } from "../../../../global_logic/userEnter.js";

const UPDATE_TIMEOUT = 3000;

class PreferenceSettingsContainer extends React.Component {
    updateTimerId = -1;
    nextPatch = {};

    requestPatch (nextPatch) {
        if (this.props.demo) return;

        this.props.addPreferencesPatcher(this.props.id);

        clearTimeout(this.updateTimerId);

        this.nextPatch = nextPatch;

        this.updateTimerId = setTimeout(() => {
            this.updateTimerId = -1;
            let patchData = {...this.nextPatch};
            this.nextPatch = {};

            axios.put("http://localhost:5000/api/v1/prefs/patch_pref", {
                jwtToken: getJWT(),
                id: Number(this.props.id),
                patch: patchData,
            }).catch(error => {
                let status = error?.response?.status ?? -1;
                if (status === 400) return;
                if (status === 401) this.props.router.navigate("/login");
                if (status === 404) this.props.router.navigate("/login");
            }).finally(() => {
                if (this.updateTimerId === -1) this.props.deletePreferencesPatcher(this.props.id);
            });
        }, UPDATE_TIMEOUT);
    }

    patch (newData) {
        this.props.patchPreferencesData(this.props.group, this.props.id, newData);

        this.requestPatch({
            ...this.nextPatch,
            ...newData,
        });
    }
}

export default PreferenceSettingsContainer;