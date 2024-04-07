import classes from "./NavItem.module.css";
import { NavLink } from "react-router-dom";

const NavItem = props => {
    return (
        <NavLink 
        to={props.to} 
        className={classes.item + " " + (props.highlighted ? classes.highlighted : "")}>{props.text}</NavLink>
    );
}

export default NavItem;