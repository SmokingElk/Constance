import classes from "./Header.module.css";
import { NavLink } from "react-router-dom";

const Header = props => {
    let linkToShow = <NavLink to="/login">войти</NavLink>;
    if (props.isUserEntered) {
        linkToShow = <NavLink to="/profile">{props.username}</NavLink>;
    }

    return (
        <div className={classes.layout}>
            <div></div>
            {linkToShow}
        </div>
    )
}

export default Header;