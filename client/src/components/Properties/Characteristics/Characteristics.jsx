import Loader from "../../Utils/Loader/Loader";
import createBinaryCharacteristicSettingsContainer from "./CharacteristicSettingComponents/BinaryCharacteristicSetting/BinaryCharacteristicSettingContainer";
import createContinuousCharacteristicSettingContainer from "./CharacteristicSettingComponents/ContinuousCharacteristicSetting/ContinuousCharacteristicSettingContainer";
import createDiscretCharacteristicSettingContainer from "./CharacteristicSettingComponents/DiscretCharacteristicSetting/DiscretCharacteristicSettingContainer";
import classes from "./Characteristics.module.css";
import SavingWrapper from "./SavingWrapper/SavingWrapper";

const groupsTranslate = {
    appearance: "Внешность",
    intimate: "Вопросы интимного характера",
    personality: "Личностные качества",
    worldview: "Мировоззрение",
    experience: "Опыт",
    lifestyle: "Образ жизни",
};

const createGroups = (characteristicsTree, sex) => {
    let groups = [];

    let userSex = {
        [true]: "male",
        [false]: "female",
    }[sex];

    for (let group in characteristicsTree) {
        let settingsElements = [];

        for (let id in characteristicsTree[group]) {
            if (
                userSex !== characteristicsTree[group][id].sex &&
                characteristicsTree[group][id].sex !== "both"
            )
                continue;

            let CharacteristicSetting;

            switch (characteristicsTree[group][id].type) {
                case "binary":
                    CharacteristicSetting = createBinaryCharacteristicSettingsContainer(group, id);
                    break;
                case "continuous":
                    CharacteristicSetting = createContinuousCharacteristicSettingContainer(
                        group,
                        id,
                    );
                    break;
                case "discrete":
                    CharacteristicSetting = createDiscretCharacteristicSettingContainer(group, id);
                    break;
                default:
                    break;
            }

            settingsElements.push(<CharacteristicSetting key={id} />);
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

const Characteristics = (props) => {
    const groups = createGroups(props.characteristicsTree, props.sex);

    return (
        <div className={classes.body}>
            {props.isFetching && <Loader size={80} black={true} />}
            <div className={classes.characteristicsContainer}>{groups}</div>

            <SavingWrapper />
        </div>
    );
};

export default Characteristics;
