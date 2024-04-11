import NavItem from "./NavItem/NavItem";
import classes from "./Navbar.module.css";

const Navbar = props => {
    let isEntered = props.isUserEntered;

    let enterNav = <NavItem 
    toggleNavbar={props.toggle} 
    to={isEntered ? "/profile" : "/login"} 
    highlighted={isEntered} 
    highlightMode={props.sex ? "blue" : "pink"}
    text={isEntered ? props.username : "Login"} />;
    
    return (
        <div className={classes.container + " " + (props.isOpen ? classes.open : "")}>
            <div className={classes.layout}>
                <NavItem toggleNavbar={props.toggle} to="/" text="Home" />
                <NavItem toggleNavbar={props.toggle} to="/search" text="Search" />
                <NavItem toggleNavbar={props.toggle} to="/properites" text="Properites" />
                {enterNav}
            </div>

            <div onClick={() => props.toggle(!props.isOpen)} className={classes.burgerButton}>
                <span></span>
            </div>
        </div>
    );
}

export default Navbar;