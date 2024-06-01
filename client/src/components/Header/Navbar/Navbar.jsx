import NavItem from "./NavItem/NavItem";
import classes from "./Navbar.module.css";

/*
Компонент верхнего меню приложения. Используется, как часть Navbar.
*/ 

const Navbar = (props) => {
    let isEntered = props.isUserEntered;

    let enterNav = (
        <NavItem
            toggleNavbar={props.toggle}
            to={isEntered ? "/profile" : "/login"}
            highlighted={isEntered}
            highlightMode={props.sex ? "blue" : "pink"}
            text={isEntered ? props.username : "Войти"}
        />
    );

    return (
        <div className={classes.container + " " + (props.isOpen ? classes.open : "")}>
            <div className={classes.layout}>
                <NavItem toggleNavbar={props.toggle} to="/" text="Домой" />
                <NavItem toggleNavbar={props.toggle} to="/search" text="Поиск" />
                <NavItem
                    toggleNavbar={props.toggle}
                    to="/properties/preferences"
                    text="Параметры"
                />
                {enterNav}
            </div>

            <div onClick={() => props.toggle(!props.isOpen)} className={classes.burgerButton}>
                <span></span>
            </div>
        </div>
    );
};

export default Navbar;
