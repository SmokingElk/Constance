import classes from "./ScaleCoeffitients.module.css";

const ScaleCoeffitients = props => {
    const onScalePositiveChange = e => props.patch(props.otherNegative ? {positiveScale: Number(e.target.value)} : {
        positiveScale: Number(e.target.value),
        negativeScale: Number(e.target.value), 
    });
    
    const onScaleNegativeChange = e => props.patch({negativeScale: Number(e.target.value)});
    const enableNegative = () => props.patch({otherNegative: true});

    const negativeBlock = <div>
        <div className={classes.coefLabel}>Negative scale coefficient</div>
        <input 
        className={"inputField" + " " + classes.coefInput}
        type="number" 
        step="0.01"
        value={props.negativeScale} 
        onChange={onScaleNegativeChange}></input>
    </div>;

    return (
        <div className={classes.body}>
            <div className={classes.positiveBlock}>
                <div className={classes.coefLabel}>{props.otherNegative ? "Positive scale " : "Scale "} coefficient</div>
                <input 
                className={"inputField" + " " + classes.coefInput}
                type="number" 
                step="0.01"
                value={props.positiveScale} 
                onChange={onScalePositiveChange}></input>
            </div>

            {props.otherNegative ? negativeBlock : <div className={classes.useNegLink} onClick={enableNegative}>Set other scale for negative mark</div>}
        </div>
    )
};

export default ScaleCoeffitients;