import classes from "./DiscretCharacteristicSetting.module.css";

const DiscretCharacteristicSetting = props => {
    return (
        <div>
            <h4>{props.name}</h4>

            <select onChange={e => props.patch(e.target.value)} value={props.value}>
                {props.variants.map(e => <option value={e}>{e}</option>)}
            </select>
        </div>
    )
};

export default DiscretCharacteristicSetting;