import { AUTH_STATUS_INCOMPLETE_DATA, AUTH_STATUS_INCORRECT_DATA, AUTH_STATUS_NONE, AUTH_STATUS_SUCCESS } from "../../redux/loginReducer";
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
        <div>
            <div>Вход</div>
            <div>Username</div>
            <div>
                <textarea onChange={onUsernameChange} value={props.usernameFieldValue}></textarea>
            </div>

            <div>Password</div>
            <div>
                <textarea onChange={onPasswordChange} value={props.passwordFieldValue}></textarea>
            </div>

            <div>Нет аккаунта?</div>
            <NavLink to="/sign_up">Зарегистрироваться</NavLink>

            <div>{authInfo}</div>

            <button onClick={() => props.sendAuthRequest()}>login</button>
        </div>
    );
}

export default Login;