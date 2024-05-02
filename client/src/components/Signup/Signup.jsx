import { SIGNUP_STATUS_ALREADY_EXISTS, SIGNUP_STATUS_INCOMPLETE_DATA, SIGNUP_STATUS_INVALID_DATA, SIGNUP_STATUS_NONE, SIGNUP_STATUS_SUCCESS, SIGNUP_STATUS_TOO_YOUNG } from "../../redux/signupReducer";
import Button from "../Utils/Button/Button";
import Checkbox from "../Utils/Checkbox/Checkbox";
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
                    <div className={classes.title}>Регистрация</div>

                    <div className={classes.label}>Имя пользователя</div>
                    <input type="text" className={"inputField" + " " + classes.fieldOffset} onChange={onUsernameChange} value={props.usernameFieldValue}></input>

                    <div className={classes.label}>Пароль</div>
                    <input type="text" className={"inputField" + " " + classes.fieldOffset} onChange={onPasswordChange} value={props.passwordFieldValue}></input>
                    
                    <div className={classes.row + " " + classes.fieldOffset}>
                        <div className={classes.label + " " + classes.inlineLabel}>Пол</div>
                        <div className={classes.checkboxGroup}>
                            <Checkbox value={props.isMale} onClick={() => props.updateSex(true)} />
                            <label className={classes.checkboxLabel}>М</label>
                            <Checkbox value={!props.isMale} onClick={() => props.updateSex(false)} pink={true} />
                            <label className={classes.checkboxLabel}>Ж</label>
                        </div>
                    </div>

                    <div className={classes.row + " " + classes.fieldsGroupOffset}>
                        <div className={classes.label + " " + classes.inlineLabel}>Дата рождения</div>
                        <input type="date" value={props.birthdate} onChange={onBirthdateChange} className={classes.birthdateField}></input>
                    </div>

                    <div className={classes.signupInfo}>{signupInfo}</div>

                    <div className={classes.buttonContainer}>
                        <Button 
                        pink={!props.isMale} 
                        onClick={() => props.sendSignupRequest()} 
                        text="Зарегистрироваться" 
                        showLoader={props.isFetching}/>
                    </div>

                    <div className={classes.hint}> 
                        Уже есть аккаунт?
                        <NavLink className={classes.loginLink} to="/login"> Войти</NavLink>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default Signup;
