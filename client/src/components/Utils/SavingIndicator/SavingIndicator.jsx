import Loader from "../Loader/Loader";
import classes from "./SavingIndicator.module.css";
import checkedMark from "../../../assets/imgs/check_mark.svg";

/*
Компонент индикатора сохранения со стандартным для приложения дизайном.
 */ 

const SavingIndicator = (props) => {
    return (
        <div className={classes.savingIndicator + " " + (props.saving ? classes.active : "")}>
            {props.saving ? (
                <>
                    <Loader size={30} /> сохранение...
                </>
            ) : (
                <>
                    <img src={checkedMark} className={classes.checkedMark} alt="" /> сохраненено
                </>
            )}
        </div>
    );
};

export default SavingIndicator;
