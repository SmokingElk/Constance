import classes from "./Checkbox.module.css";

/*
Компонент чекбокса со стандартным для приложения дизайном.
 */ 

const Checkbox = (props) => {
    return (
        <div
            onClick={props.onClick}
            className={
                classes.layout +
                " " +
                (props.value ? classes.checked : "") +
                " " +
                (props.pink ? classes.pink : "")
            }
        ></div>
    );
};

export default Checkbox;
