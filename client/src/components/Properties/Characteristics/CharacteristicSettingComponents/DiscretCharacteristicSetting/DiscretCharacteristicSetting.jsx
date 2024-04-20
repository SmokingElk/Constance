import classes from "./DiscretCharacteristicSetting.module.css";
import common from "../CharacteristicSettingCommon.module.css";

const DiscretCharacteristicSetting = props => {
    return (
        <div className={common.settingBlock}>
            <h4 className={common.settingName}>{props.name}</h4>

            <select className={classes.list} onChange={e => props.patch(e.target.value)} value={props.value}>
                {props.variants.map(e => <option value={e}>{e}</option>)}
            </select>
        </div>
    )
};

export default DiscretCharacteristicSetting;