import ScaleCoeffitients from "../../ScaleCoeffitients/ScaleCoeffitients";
import common from "../PreferenceSettingCommon.module.css";

const BinaryPreferenceSettings = (props) => {
    return (
        <div className={common.settingBlock}>
            <h4 className={common.settingName}>{props.name}</h4>

            <ScaleCoeffitients
                patch={props.patch}
                positiveScale={props.positiveScale}
                negativeScale={props.negativeScale}
                otherNegative={props.otherNegative}
            />
        </div>
    );
};

export default BinaryPreferenceSettings;
