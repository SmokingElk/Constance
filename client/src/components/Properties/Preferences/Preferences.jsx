import Loader from "../../Utils/Loader/Loader";
import createBinaryPreferenceSettingsContainer from "./PreferenceSettingComponents/BinaryPreferenceSettings/BinaryPreferenceSettingsContainer";
import createContinuousPreferenceSettingsContainer from "./PreferenceSettingComponents/ContinousPreferenceSettings/ContinuousPreferenceSettingsContainer";
import createDiscretPreferenceSettingsContainer from "./PreferenceSettingComponents/DiscretPreferenceSettings/DiscretPreferenceSettingContainer";
import classes from "./Preferences.module.css";
import SavingWrapper from "./SavingWrapper/SavingWrapper";

/*
Компонент отображения предпочтений. При отображении разбивает их на группы. 
Не реализует логику обновления параметров. Она реализована в более глубоких компанентах.  
 */ 

const groupsTranslate = {
    appearance: "Внешность",
    intimate: "Вопросы интимного характера",
    personality: "Личностные качества",
    worldview: "Мировоззрение",
    experience: "Опыт",
    lifestyle: "Образ жизни",
};

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
                default:
                    break;
            }

            settingsElements.push(<PreferenceSetting key={id} />);
        }

        groups.push(
            <div className={classes.group}>
                <h3 className={classes.groupName}>{groupsTranslate[group]}</h3>
                {settingsElements}
            </div>,
        );
    }

    return groups;
};

const Preferences = (props) => {
    let preferencesTree = props.preferencesTree;
    let groups = createGroups(preferencesTree, props.sex);

    return (
        <div className={classes.body}>
            {props.isFetching && <Loader size={80} black={true} />}
            <div className={classes.preferencesContainer}>{groups}</div>

            <SavingWrapper />
        </div>
    );
};

export default Preferences;
