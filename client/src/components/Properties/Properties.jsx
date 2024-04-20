import { NavLink, Route, Router } from "react-router-dom";
import classes from "./Properties.module.css";
import PreferencesContainer from "./Preferences/PreferencesContainer";
import CharacteristicsContainer from "./Characteristics/CharacteristicsContainer";
import Container from "../Utils/Container/Container";

const Properties = props => {
    return (
        <Container fitHeight={true}>
            <div className={classes.body}>
                <div className={classes.layout}>
                    <div className={classes.content}>
                        <div className={classes.innerNav}>
                            <NavLink 
                            className={classes.link + " " + (props.showPreferences ? classes.highlighted : "")} 
                            to="/properties/preferences">Preferences</NavLink>

                            <NavLink
                            className={classes.link + " " + (!props.showPreferences ? classes.highlighted : "")} 
                            to="/properties/characteristics">Characteristics</NavLink>
                        </div>

                        <div>{props.showPreferences ? <PreferencesContainer /> : <CharacteristicsContainer />}</div>
                    </div>
                </div>
            </div>    
        </Container>
    );
}

export default Properties;