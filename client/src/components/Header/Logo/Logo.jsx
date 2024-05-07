import { NavLink } from "react-router-dom";
import classes from "./Logo.module.css";
import LogoImg from "../../../assets/imgs/logo_img.png";

const Logo = (props) => {
    return (
        <NavLink to="/">
            <div className={classes.layout}>
                <img src={LogoImg} alt="logo" className={classes.image} />
                <div className={classes.appName}>Constance</div>
            </div>
        </NavLink>
    );
};

export default Logo;
