import { NavLink } from "react-router-dom";
import Container from "../Utils/Container/Container";
import classes from "./Footer.module.css";

/*
Компонент общего для всех страниц подвала
*/

const Footer = (props) => {
    return (
        <Container>
            <div className={classes.layout}>
                <div className={classes.productName}>© 2024 «Constance»</div>
                <div className={classes.support}>Служба поддержки: supofconstance@gmail.com</div>
                <NavLink to="/privacy_policy" className={classes.privacyPolicy}>
                    Полтика конфидециальности
                </NavLink>
            </div>
        </Container>
    );
};

export default Footer;
