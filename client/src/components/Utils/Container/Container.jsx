import classes from "./Container.module.css";

/*
Компонент для задания отступа контентной части.
 */ 

const Container = (props) => {
    return (
        <div className={classes.container + " " + (props.fitHeight ? classes.fitHeight : "")}>
            {props.children}
        </div>
    );
};

export default Container;
