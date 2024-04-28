import Loader from "../../Utils/Loader/Loader";
import createBinaryPreferenceSettingsContainer from "./PreferenceSettingComponents/BinaryPreferenceSettings/BinaryPreferenceSettingsContainer";
import createContinuousPreferenceSettingsContainer from "./PreferenceSettingComponents/ContinousPreferenceSettings/ContinuousPreferenceSettingsContainer";
import createDiscretPreferenceSettingsContainer from "./PreferenceSettingComponents/DiscretPreferenceSettings/DiscretPreferenceSettingContainer";
import classes from "./Preferences.module.css";

const createGroups = (preferencesTree, sex) => {
    let groups = [];
    let userSex = {
        [true]: "male",
        [false]: "female",
    }[sex];

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

        groups.push(<div className={classes.group}>
            <h3 className={classes.groupName}>{group}</h3>
            {settingsElements}
        </div>);
    }

    return groups;
}

const Preferences = props => {
    let preferencesTree = props.preferencesTree;
    let groups = createGroups(preferencesTree, props.sex);

    return (
        <div className={classes.body}>
            {props.isFetching && <Loader size={80} black={true} />}
            <div className={classes.preferencesContainer}>{groups}</div>
        </div>
    );
}

export default Preferences;