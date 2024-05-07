import classes from "./NavItem.module.css";
import { NavLink } from "react-router-dom";

const NavItem = (props) => {
    const highlightModeClass = {
        blue: classes.highlightBlue,
        pink: classes.highlightPink,
    }[props.highlightMode ?? "blue"];

    const highlightingClasses = props.highlighted
        ? classes.highlighted + " " + highlightModeClass
        : "";

    return (
        <NavLink
            onClick={() => props.toggleNavbar(false)}
            to={props.to}
            className={classes.item + " " + highlightingClasses}
        >
            {props.text}
        </NavLink>
    );
};

export default NavItem;
