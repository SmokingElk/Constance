import { AUTH_STATUS_INCOMPLETE_DATA, AUTH_STATUS_INCORRECT_DATA, AUTH_STATUS_NONE, AUTH_STATUS_SUCCESS } from "../../redux/loginReducer";
import Button from "../Utils/Button/Button";
import Container from "../Utils/Container/Container";
import classes from "./Login.module.css";
import { NavLink } from "react-router-dom";

const Login = props => {
    const onUsernameChange = event => {
        props.updateUsername(event.target.value);
    };

    const onPasswordChange = event => {
        props.updatePassword(event.target.value);
    };

    let authInfo = {
        [AUTH_STATUS_INCOMPLETE_DATA]: "Заполните все поля",
        [AUTH_STATUS_INCORRECT_DATA]: "Неверный логин или пароль",
        [AUTH_STATUS_SUCCESS]: "Успех",
        [AUTH_STATUS_NONE]: "",
    }[props.authStatus] ?? "";

    return (
        <Container>
            <div className={classes.layout}>
                <div className={classes.body}>
                    <div className={classes.title}>Вход</div>

                    <div className={classes.label}>Имя пользователя</div>
                    <input type="text" className={"inputField " + classes.usernameField} onChange={onUsernameChange} value={props.usernameFieldValue}></input>

                    <div className={classes.label}>Пароль</div>
                    <input type="text" className={"inputField " + classes.passwordField} onChange={onPasswordChange} value={props.passwordFieldValue}></input>

                    <div className={classes.authInfo}>{authInfo}</div>

                    <div className={classes.loginBtn}>
                        <Button onClick={() => props.sendAuthRequest()} text="Войти" showLoader={props.isFetching}/>
                    </div>
                    

                    <div className={classes.hint}>Нет аккаунта? <NavLink to="/sign_up" className={classes.signUpLink}> Зарегистрироваться</NavLink></div>
                </div>
            </div>
        </Container>
    );
}

export default Login;