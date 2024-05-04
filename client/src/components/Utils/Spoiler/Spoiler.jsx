import classes from "./Spoiler.module.css";

const Spoiler = props => {
    return (
        <div className={classes.body}>
            <div className={classes.column}>
                <div className={classes.header}>
                    <div className={classes.title}>{props.title}</div>
                    <div className={classes.toggleBtn + " " + (props.isOpen ? classes.btnClose : "")} onClick={props.toggle}></div>
                </div>
                
                <div className={classes.content + " " + (props.isOpen ? classes.open : "")}>
                    {props.children}
                </div>
            </div>
        </div>
    );
};

export default Spoiler;