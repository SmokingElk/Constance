import classes from "./ContinuousCharacteristicSetting.module.css";
import common from "../CharacteristicSettingCommon.module.css";

const ContinuousCharacteristicSetting = props => {
    return (
        <div className={common.settingBlock}>
            <h4 className={common.settingName}>{props.name}</h4>

            <div className={classes.sliderBlock}>
                <input 
                className={classes.slider}
                type="range" 
                value={props.value} 
                min={props.range.min} 
                max={props.range.max} 
                step={0.01}
                onChange={e => props.patch(e.target.value)}/>

                <div className={classes.labelsRow}>{props.labels.map(e => <div>{e}</div>)}</div>
            </div>
        </div>
    );
}

export default ContinuousCharacteristicSetting;