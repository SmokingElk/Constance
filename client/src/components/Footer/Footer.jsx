import Container from "../Utils/Container/Container";
import classes from "./Footer.module.css";

const Footer = props => {
    return (
        <Container>
            <div className={classes.layout}>
                <div className={classes.productName}>© 2024 «Constance»</div>
                <div className={classes.support}>Служба поддержки: supofconstance@gmail.com</div>
                <a href="/" className={classes.privacyPolicy}>Полтика конфидециальности</a>
            </div>
        </Container>
    );
};

export default Footer;