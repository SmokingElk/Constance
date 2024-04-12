import BinaryPreferenceSettings from "./PreferenceSettingComponents/BinaryPreferenceSettings/BinaryPreferenceSettings";
import ContinuousPreferenceSettings from "./PreferenceSettingComponents/ContinousPreferenceSettings/ContinuousPreferenceSettings";
import DiscretPreferenceSettings from "./PreferenceSettingComponents/DiscretPreferenceSettings/DiscretPreferenceSettings";
import classes from "./Preferences.module.css";

const createGroups = (preferencesData, userSex) => {
    let groups = [];

    for (let group in preferencesData) {
        let settingsElements = [];

        for (let id in preferencesData[group]) {
            // свойства, соответствующие полу пользователя не могут находится в его предпочтениях
            // не показывать их
            // если both - показывает
            if (userSex === preferencesData[group][id].sex) continue;

            switch (preferencesData[group][id].type) {
                case "binary":
                    settingsElements.push(<BinaryPreferenceSettings {...preferencesData[group][id]} />);
                    break;
                case "continuous":
                    settingsElements.push(<ContinuousPreferenceSettings {...preferencesData[group][id]} />);
                    break;
                case "discrete":
                    settingsElements.push(<DiscretPreferenceSettings {...preferencesData[group][id]} />);
                    break;
            }
        }

        groups.push(<div>
            <h3>{group}</h3>
            {settingsElements}
        </div>);
    }

    return groups;
}

const Preferences = props => {
    let preferencesData = props.preferencesData;
    let groups = createGroups(preferencesData, props.sex);

    return (
        <div>
            <div>Preferences</div>
            <div className={classes.preferencesContainer}>{groups}</div>
        </div>
    )
};

export default Preferences;