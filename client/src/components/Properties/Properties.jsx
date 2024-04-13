import { NavLink, Route, Router } from "react-router-dom";
import classes from "./Properties.module.css";
import PreferencesContainer from "./Preferences/PreferencesContainer";

const Properties = props => {
    return (
        <div className={classes.layout}>
            <div className={classes.innerNav}>
                <NavLink to="/properties/preferences">Preferences</NavLink>
                <NavLink to="/properties/characteristics">Characteristics</NavLink>
            </div>

            <div>{props.showPreferences ? <PreferencesContainer /> : <div>Characteristics (tmp)</div>}</div>
        </div>
    );
}

export default Properties;