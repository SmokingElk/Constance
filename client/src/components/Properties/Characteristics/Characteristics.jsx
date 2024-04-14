import createBinaryCharacteristicSettingsContainer from "./CharacteristicSettingComponents/BinaryCharacteristicSetting/BinaryCharacteristicSettingContainer";
import classes from "./Characteristics.module.css";

const createGroups = (characteristicsTree, userSex) => {
    let groups = [];

    for (let group in characteristicsTree) {
        let settingsElements = [];

        for (let id in characteristicsTree[group]) {
            if (userSex !== characteristicsTree[group][id].sex && characteristicsTree[group][id].sex !== "both") continue;

            if (characteristicsTree[group][id].type !== "binary") continue;

            let CharacteristicSetting;

            switch (characteristicsTree[group][id].type) {
                case "binary":
                    CharacteristicSetting = createBinaryCharacteristicSettingsContainer(group, id);
                    break;
                case "continuous":
                    
                    break;
                case "discrete":
                    
                    break;
            }

            settingsElements.push(<CharacteristicSetting key={id} />);
        }

        groups.push(<div>
            <h3>{group}</h3>
            {settingsElements}
        </div>);
    }

    return groups;
};

const Characteristics = props => {
    const groups = createGroups(props.characteristicsTree, props.sex);

    return (
        <div>
            <div>Characteristics</div>
            <div className={classes.characteristicsContainer}>{groups}</div>
        </div>
    );
}

export default Characteristics;