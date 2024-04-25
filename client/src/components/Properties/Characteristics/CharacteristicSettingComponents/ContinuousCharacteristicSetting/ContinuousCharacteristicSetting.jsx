import classes from "./ContinuousCharacteristicSetting.module.css";
import common from "../CharacteristicSettingCommon.module.css";
import Range from "../../../../Utils/Range/Range";

const ContinuousCharacteristicSetting = props => {
    

    return (
        <div className={common.settingBlock}>
            <h4 className={common.settingName}>{props.name}</h4>

            <div className={classes.sliderBlock}>
                <Range 
                value={props.value} 
                min={props.range.min} 
                max={props.range.max} 
                onChange={value => props.patch(value)}/>

                <div className={classes.labelsRow}>{props.labels.map(e => <div>{e}</div>)}</div>
            </div>
        </div>
    );
}

export default ContinuousCharacteristicSetting;