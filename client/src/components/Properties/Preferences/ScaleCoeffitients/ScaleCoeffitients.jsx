import classes from "./ScaleCoeffitients.module.css";

const ScaleCoeffitients = props => {
    const onScalePositiveChange = e => props.patch(props.otherNegative ? {positiveScale: Number(e.target.value)} : {
        positiveScale: Number(e.target.value),
        negativeScale: Number(e.target.value), 
    });
    
    const onScaleNegativeChange = e => props.patch({negativeScale: Number(e.target.value)});
    const enableNegative = () => props.patch({otherNegative: true});

    const negativeBlock = <div>
        <div>Negative scale coefficient</div>
        <input 
        type="number" 
        step="0.01"
        value={props.negativeScale} 
        onChange={onScaleNegativeChange}></input>
    </div>;

    return (
        <div>
            <div>
                <div>{props.otherNegative ? "Positive scale " : "Scale "} coefficient</div>
                <input 
                type="number" 
                step="0.01"
                value={props.positiveScale} 
                onChange={onScalePositiveChange}></input>
            </div>

            {props.otherNegative ? negativeBlock : <div onClick={enableNegative}>Set other scale for negative mark</div>}
        </div>
    )
};

export default ScaleCoeffitients;