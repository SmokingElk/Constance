import Loader from "../Loader/Loader";
import classes from "./Button.module.css";

/*
Компонент кнопки со стандартным для приложения дизайном.
 */ 

const Button = (props) => {
    let showLoader = props.showLoader ?? false;

    return (
        <button
            className={classes.button + " " + (props.pink ? classes.pink : "")}
            onClick={props.onClick}
        >
            {props.text}
            {showLoader && <Loader size={30} />}
        </button>
    );
};

export default Button;
