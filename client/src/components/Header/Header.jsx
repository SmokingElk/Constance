import classes from "./Header.module.css";
import Logo from "./Logo/Logo";
import Container from "../Utils/Container/Container";
import Navbar from "./Navbar/Navbar";

const Header = props => {
    return (
        <Container>
            <div className={classes.layout}>
                <Logo />
                <Navbar isUserEntered={props.isUserEntered} username={props.username} />
            </div>
        </Container>
    )
}

export default Header;