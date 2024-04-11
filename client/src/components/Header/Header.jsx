import classes from "./Header.module.css";
import Logo from "./Logo/Logo";
import Container from "../Utils/Container/Container";
import Navbar from "./Navbar/Navbar";

const Header = props => {
    return (
        <Container>
            <div className={classes.layout}>
                <Logo />
                <Navbar toggle={props.toggleNavbar} isOpen={props.isNavbarOpen} isUserEntered={props.isUserEntered} username={props.username} sex={props.sex} />
            </div>
        </Container>
    );
}

export default Header;