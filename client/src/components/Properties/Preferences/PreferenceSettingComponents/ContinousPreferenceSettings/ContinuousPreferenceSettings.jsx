import ScaleCoeffitients from "../../ScaleCoeffitients/ScaleCoeffitients";
import SpreadChart from "./SpreadChart/SpreadChart";
import common from "../PreferenceSettingCommon.module.css";

/*
Компонент непрерывного предпочтения.
 */ 

const ContinuousPreferenceSettings = (props) => {
    return (
        <div className={common.settingBlock}>
            <h4 className={common.settingName}>{props.name}</h4>

            <ScaleCoeffitients
                patch={props.patch}
                positiveScale={props.positiveScale}
                negativeScale={props.negativeScale}
                otherNegative={props.otherNegative}
            />

            <SpreadChart
                axisName={props.axisName}
                labels={props.labels}
                range={props.range}
                spreadPoints={props.spreadPoints}
                patch={props.patchSpread}
            />
        </div>
    );
};

export default ContinuousPreferenceSettings;
