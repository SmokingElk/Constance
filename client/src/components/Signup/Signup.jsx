import { SIGNUP_STATUS_ALREADY_EXISTS, SIGNUP_STATUS_INCOMPLETE_DATA, SIGNUP_STATUS_INVALID_DATA, SIGNUP_STATUS_NONE, SIGNUP_STATUS_SUCCESS, SIGNUP_STATUS_TOO_YOUNG } from "../../redux/signupReducer";
import Button from "../Utils/Button/Button";
import Container from "../Utils/Container/Container";
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
        <Container>
            <div className={classes.layout}>
                <div className={classes.body}>
                    <div className={classes.title}>Sign up</div>

                    <div className={classes.label}>Username</div>
                    <input type="text" className={"inputField" + " " + classes.fieldOffset} onChange={onUsernameChange} value={props.usernameFieldValue}></input>

                    <div className={classes.label}>Password</div>
                    <input type="text" className={"inputField" + " " + classes.fieldOffset} onChange={onPasswordChange} value={props.passwordFieldValue}></input>
                    
                    <div className={classes.row + " " + classes.fieldOffset}>
                        <div className={classes.label + " " + classes.inlineLabel}>Select sex</div>
                        <div>
                            <input type="checkbox" checked={props.isMale ? "checked" : ""} onClick={() => props.updateSex(true)}></input>
                            <label className={classes.checkboxLabel}>M</label>
                            <input type="checkbox" checked={props.isMale ? "" : "checked"} onClick={() => props.updateSex(false)}></input>
                            <label className={classes.checkboxLabel}>W</label>
                        </div>
                    </div>

                    <div className={classes.row + " " + classes.fieldsGroupOffset}>
                        <div className={classes.label + " " + classes.inlineLabel}>Set birthday</div>
                        <input type="date" value={props.birthdate} onChange={onBirthdateChange} className={classes.birthdateField}></input>
                    </div>

                    <div className={classes.signupInfo}>{signupInfo}</div>

                    <div className={classes.buttonContainer}>
                        <Button onClick={() => props.sendSignupRequest()} text="Sign up" />
                    </div>
                    

                    <div className={classes.hint}> 
                        Already have an account?
                        <NavLink className={classes.loginLink} to="/login"> Login</NavLink>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default Signup;
