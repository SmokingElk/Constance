import ScaleCoeffitients from "../../ScaleCoeffitients/ScaleCoeffitients";
import classes from "./ContinuousPreferenceSettings.module.css";
import SpreadChart from "./SpreadChart/SpreadChart";

const ContinuousPreferenceSettings = props => {
    return (
        <div>
            <h4>{props.name}</h4>

            <ScaleCoeffitients 
            patch={props.patch} 
            positiveScale={props.positiveScale} 
            negativeScale={props.negativeScale}
            otherNegative={props.otherNegative} />

            <SpreadChart labels={props.labels} range={props.range} spreadPoints={props.spreadPoints} patch={props.patchSpread} />
        </div>
    );
}

export default ContinuousPreferenceSettings;