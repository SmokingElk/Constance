import BinaryPreferenceSettings from "./PreferenceSettingComponents/BinaryPreferenceSettings/BinaryPreferenceSettings";
import createBinaryPreferenceSettingsContainer from "./PreferenceSettingComponents/BinaryPreferenceSettings/BinaryPreferenceSettingsContainer";
import ContinuousPreferenceSettings from "./PreferenceSettingComponents/ContinousPreferenceSettings/ContinuousPreferenceSettings";
import createContinuousPreferenceSettingsContainer from "./PreferenceSettingComponents/ContinousPreferenceSettings/ContinuousPreferenceSettingsContainer";
import createDiscretPreferenceSettingsContainer from "./PreferenceSettingComponents/DiscretPreferenceSettings/DiscretPreferenceSettingContainer";
import DiscretPreferenceSettings from "./PreferenceSettingComponents/DiscretPreferenceSettings/DiscretPreferenceSettings";
import classes from "./Preferences.module.css";

const createGroups = (preferencesTree, userSex, patchPreference, patchDiscretCoef) => {
    let groups = [];

    for (let group in preferencesTree) {
        let settingsElements = [];

        for (let id in preferencesTree[group]) {
            // свойства, соответствующие полу пользователя не могут находится в его предпочтениях
            // не показывать их
            // если both - показывает
            if (userSex === preferencesTree[group][id].sex) continue;

            let PreferenceSetting;

            switch (preferencesTree[group][id].type) {
                case "binary":
                    PreferenceSetting = createBinaryPreferenceSettingsContainer(group, id);
                    break;
                case "continuous":
                    PreferenceSetting = createContinuousPreferenceSettingsContainer(group, id);
                    break;
                case "discrete":
                    PreferenceSetting = createDiscretPreferenceSettingsContainer(group, id);
                    break;
            }

            settingsElements.push(<PreferenceSetting key={id} />);
        }

        groups.push(<div>
            <h3>{group}</h3>
            {settingsElements}
        </div>);
    }

    return groups;
}

const Preferences = props => {
    let preferencesTree = props.preferencesTree;
    let groups = createGroups(preferencesTree, props.sex, props.patchPreferencesData, props.patchDiscretCoef);

    return (
        <div>
            <div>Preferences</div>
            <div className={classes.preferencesContainer}>{groups}</div>
        </div>
    )
};

export default Preferences;