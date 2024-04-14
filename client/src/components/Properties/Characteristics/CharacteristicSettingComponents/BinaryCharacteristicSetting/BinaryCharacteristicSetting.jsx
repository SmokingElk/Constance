import Checkbox from "../../../../Utils/Checkbox/Checkbox";
import classes from "./BinaryCharacteristicSetting.module.css";

const BinaryCharacteristicSetting = props => {
    return (
        <div>
            <h4>{props.name}</h4>

            <div className={classes.checkboxContainer}>
                <Checkbox value={props.value} onClick={() => props.patch(true)}/>
                <div className={classes.label}>да</div>
                <Checkbox value={!props.value} onClick={() => props.patch(false)}/>
                <div className={classes.label}>нет</div>
            </div>
        </div>
    );
};

export default BinaryCharacteristicSetting;