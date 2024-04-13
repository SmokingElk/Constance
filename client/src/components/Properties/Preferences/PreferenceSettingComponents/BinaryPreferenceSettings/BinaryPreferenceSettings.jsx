import ScaleCoeffitients from "../../ScaleCoeffitients/ScaleCoeffitients";
import classes from "./BinaryPreferenceSettings.module.css";

const BinaryPreferenceSettings = props => {
    return (
        <div>
            <h4>{props.name}</h4>

            <ScaleCoeffitients 
            patch={props.patch} 
            positiveScale={props.positiveScale} 
            negativeScale={props.negativeScale}
            otherNegative={props.otherNegative} />
        </div>
    );
}

export default BinaryPreferenceSettings;