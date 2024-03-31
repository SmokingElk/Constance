import { SIGNUP_STATUS_ALREADY_EXISTS, SIGNUP_STATUS_INCOMPLETE_DATA, SIGNUP_STATUS_INVALID_DATA, SIGNUP_STATUS_NONE, SIGNUP_STATUS_SUCCESS } from "../../redux/signupReducer";
import classes from "./Signup.module.css";
import { NavLink } from "react-router-dom";

const Signup = props => {
    const onUsernameChange = event => {
        props.updateUsername(event.target.value);
    };

    const onPasswordChange = event => {
        props.updatePassword(event.target.value);
    };

    let signupInfo = {
        [SIGNUP_STATUS_INCOMPLETE_DATA]: "Заполните все поля",
        [SIGNUP_STATUS_INVALID_DATA]: "Недопустимый логин или пароль",
        [SIGNUP_STATUS_SUCCESS]: "Успех",
        [SIGNUP_STATUS_ALREADY_EXISTS]: "Пользователь с этим именем уже существует",
        [SIGNUP_STATUS_NONE]: "",
    }[props.signupStatus] ?? "";

    return (
        <div>
            <div>Зарегистрироваться</div>
            <div>Username</div>
            <div>
                <textarea onChange={onUsernameChange} value={props.usernameFieldValue}></textarea>
            </div>

            <div>Password</div>
            <div>
                <textarea onChange={onPasswordChange} value={props.passwordFieldValue}></textarea>
            </div>

            <div>Уже есть аккаунт?</div>
            <NavLink to="/login">Войти</NavLink>

            <div>{signupInfo}</div>

            <button onClick={() => props.sendSignupRequest()}>sign up</button>
        </div>
    )
}

export default Signup;
