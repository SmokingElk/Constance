import { AUTH_STATUS_INCOMPLETE_DATA, AUTH_STATUS_INCORRECT_DATA, AUTH_STATUS_NONE, AUTH_STATUS_SUCCESS } from "../../redux/authReducer";
import classes from "./Login.module.css";

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
            <div>Username</div>
            <div>
                <textarea onChange={onUsernameChange} value={props.usernameFieldValue}></textarea>
            </div>

            <div>Password</div>
            <div>
                <textarea onChange={onPasswordChange} value={props.passwordFieldValue}></textarea>
            </div>

            <div>{authInfo}</div>

            <button onClick={() => props.sendAuthRequest()}>login</button>
        </div>
    );
}

export default Login;