import Loader from "../Loader/Loader";
import classes from "./SavingIndicator.module.css";
import checkedMark from "../../../assets/imgs/check_mark.svg";

const SavingIndicator = props => {
    return (
        <div className={classes.savingIndicator + " " + (props.saving ? classes.active : "")}>
            {props.saving ? <><Loader size={30} /> saving...</> :
            <><img src={checkedMark} className={classes.checkedMark} /> saved</>}
        </div>
    );
}

export default SavingIndicator;