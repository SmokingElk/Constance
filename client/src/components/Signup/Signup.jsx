import { SIGNUP_STATUS_ALREADY_EXISTS, SIGNUP_STATUS_INCOMPLETE_DATA, SIGNUP_STATUS_INVALID_DATA, SIGNUP_STATUS_NONE, SIGNUP_STATUS_SUCCESS, SIGNUP_STATUS_TOO_YOUNG } from "../../redux/signupReducer";
import classes from "./Signup.module.css";
import { NavLink } from "react-router-dom";

const Signup = props => {
    const onUsernameChange = event => {
        props.updateUsername(event.target.value);
    };

    const onPasswordChange = event => {
        props.updatePassword(event.target.value);
    };

    const onBirthdateChange = event => {
        props.updateBirthdate(event.target.value);
    };

    let signupInfo = {
        [SIGNUP_STATUS_INCOMPLETE_DATA]: "Заполните все поля",
        [SIGNUP_STATUS_INVALID_DATA]: "Недопустимый логин или пароль",
        [SIGNUP_STATUS_SUCCESS]: "Успех",
        [SIGNUP_STATUS_ALREADY_EXISTS]: "Пользователь с этим именем уже существует",
        [SIGNUP_STATUS_TOO_YOUNG]: "Регистрация до 18 запрещена",
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

            <div>Set birthday</div>
            <div>
                <input type="date" value={props.birthdate} onChange={onBirthdateChange}></input>
            </div>

            <div>Select sex</div>
            <div>
                <input type="checkbox" checked={props.isMale ? "checked" : ""} onClick={() => props.updateSex(true)}></input>
                <label>male</label>
                <input type="checkbox" checked={props.isMale ? "" : "checked"} onClick={() => props.updateSex(false)}></input>
                <label>female</label>
            </div>
            

            <div>Уже есть аккаунт?</div>
            <NavLink to="/login">Войти</NavLink>

            <div>{signupInfo}</div>

            <button onClick={() => props.sendSignupRequest()}>sign up</button>
        </div>
    )
}

export default Signup;
