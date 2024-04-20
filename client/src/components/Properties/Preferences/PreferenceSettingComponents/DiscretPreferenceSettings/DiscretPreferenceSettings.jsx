import ScaleCoeffitients from "../../ScaleCoeffitients/ScaleCoeffitients";
import classes from "./DiscretPreferenceSettings.module.css";
import common from "../PreferenceSettingCommon.module.css";

const createSliders = (labels, values, patch) => {
    let res = [];


    for (let i = 0; i < values.length; i++) {
        let needWrap = labels[i].length > 30;
        res.push(<div key={i} className={classes.rowBody + " " + (needWrap ? classes.rowWrap : "")}>
            <div className={classes.rowLabel}>{labels[i]}</div>

            <input 
            className={classes.rowSlider}
            type="range" 
            value={-values[i]} 
            min={-1} 
            max={1}
            step={0.01}
            onChange={e => patch(i, -e.target.value)}/>
        </div>)
    }

    return res;
}

const DiscretPreferenceSettings = props => {
    let sliders = createSliders(props.variants, props.columnCoefs, props.patchCoef);

    return (
        <div className={common.settingBlock}>
            <h4 className={common.settingName}>{props.name}</h4>

            <ScaleCoeffitients 
            patch={props.patch} 
            positiveScale={props.positiveScale} 
            negativeScale={props.negativeScale}
            otherNegative={props.otherNegative} />

            <div className={classes.rowsContainer}>
                {sliders}
            </div>
        </div>
    );
}

export default DiscretPreferenceSettings;