import { NavLink } from "react-router-dom";
import classes from "./Properties.module.css";
import PreferencesContainer from "./Preferences/PreferencesContainer";
import CharacteristicsContainer from "./Characteristics/CharacteristicsContainer";
import Container from "../Utils/Container/Container";

/*
Компонент экрана параметров. Содержит только выбор характеристик или предпочтений и отображение соответствующего компонента.
 */

const Properties = (props) => {
    return (
        <Container fitHeight={true}>
            <div className={classes.body}>
                <div className={classes.layout}>
                    <div className={classes.content}>
                        <div className={classes.innerNav}>
                            <NavLink
                                className={
                                    classes.link +
                                    " " +
                                    (props.showPreferences ? classes.highlighted : "")
                                }
                                to="/properties/preferences"
                            >
                                Предпочтения
                            </NavLink>

                            <NavLink
                                className={
                                    classes.link +
                                    " " +
                                    (!props.showPreferences ? classes.highlighted : "")
                                }
                                to="/properties/characteristics"
                            >
                                Характеристики
                            </NavLink>
                        </div>

                        <div className={classes.settingsContainer}>
                            {props.showPreferences ? (
                                <PreferencesContainer />
                            ) : (
                                <CharacteristicsContainer />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Properties;
