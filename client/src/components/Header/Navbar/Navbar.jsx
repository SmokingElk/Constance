import NavItem from "./NavItem/NavItem";
import classes from "./Navbar.module.css";

const Navbar = props => {
    let isEntered = props.isUserEntered;

    let enterNav = <NavItem 
    to={isEntered ? "/profile" : "/login"} 
    highlighted={isEntered} 
    highlightMode={props.sex ? "blue" : "pink"}
    text={isEntered ? props.username : "Login"} />;
    
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