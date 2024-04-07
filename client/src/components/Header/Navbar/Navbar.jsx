import NavItem from "./NavItem/NavItem";
import classes from "./Navbar.module.css";

const Navbar = props => {
    let isEntered = props.isUserEntered;

    let enterNav = <NavItem 
    to={isEntered ? "/profile" : "/login"} 
    highlighted={isEntered} 
    text={isEntered ? props.username : "Log in"} />;
    
    return (
        <div className={classes.layout}>
            <NavItem to="/" text="Home" />
            <NavItem to="/search" text="Search" />
            <NavItem to="/properites" text="Properites" />
            {enterNav}
        </div>
    );
}

export default Navbar;