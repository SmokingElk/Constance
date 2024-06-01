import React from "react";
import axios from "axios";
import { getJWT } from "../../../../global_logic/userEnter";

/*
Родительский базовый компонент характеристики. 
Реализует логику создания patch для отправки на сервер данных для обновления характеристики.
*/ 

const UPDATE_TIMEOUT = 3000;

class CharacteristicSettingsContainer extends React.Component {
    updateTimerId = -1;

    patch(newValue) {
        this.props.patchCharacteristicsData(this.props.group, this.props.id, { value: newValue });

        if (this.props.demo) return;

        this.props.addCharacteristicsPatcher(this.props.id);

        clearTimeout(this.updateTimerId);

        this.updateTimerId = setTimeout(() => {
            this.updateTimerId = -1;
            let value = newValue;

            axios
                .put("http://localhost:5000/api/v1/chars/patch_chars", {
                    jwtToken: getJWT(),
                    id: this.props.id,
                    value: value,
                })
                .catch((error) => {
                    let status = error?.response?.status ?? -1;
                    if (status === 400) return;
                    if (status === 401) this.props.router.navigate("/login");
                    if (status === 404) this.props.router.navigate("/login");
                })
                .finally(() => {
                    if (this.updateTimerId === -1)
                        this.props.deleteCharacteristicsPatcher(this.props.id);
                });
        }, UPDATE_TIMEOUT);
    }
}

export default CharacteristicSettingsContainer;
