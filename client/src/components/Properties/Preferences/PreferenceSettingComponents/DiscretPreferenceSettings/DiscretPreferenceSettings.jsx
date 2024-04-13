import ScaleCoeffitients from "../../ScaleCoeffitients/ScaleCoeffitients";
import classes from "./DiscretPreferenceSettings.module.css";

const createSliders = (labels, values, patch) => {
    let res = [];


    for (let i = 0; i < values.length; i++) {
        res.push(<div className={classes.columnBody}>
            <div>
            <input 
            className={classes.columnSlider}
            type="range" 
            value={-values[i]} 
            min={-1} 
            max={1}
            step={0.01}
            onChange={e => patch(i, -e.target.value)}/>
            </div>
            

            <div className={classes.columnLabel}>{labels[i]}</div>
        </div>)
    }

    return res;
}

const DiscretPreferenceSettings = props => {
    let sliders = createSliders(props.variants, props.columnCoefs, props.patchCoef);

    return (
        <div>
            <h4>{props.name}</h4>

            <ScaleCoeffitients 
            patch={props.patch} 
            positiveScale={props.positiveScale} 
            negativeScale={props.negativeScale}
            otherNegative={props.otherNegative} />

            <div className={classes.columnsContainer}>
                {sliders}
            </div>
        </div>
    );
}

export default DiscretPreferenceSettings;