import React from "react";
import Signup from "./Signup";
import { connect } from "react-redux";
import { SIGNUP_STATUS_ALREADY_EXISTS, SIGNUP_STATUS_INCOMPLETE_DATA, SIGNUP_STATUS_INVALID_DATA, SIGNUP_STATUS_NONE, SIGNUP_STATUS_SUCCESS, SIGNUP_STATUS_TOO_YOUNG, changeSignupStatus, updateBirthdate, updateSex, updateSignupPassword, updateSignupUsername } from "../../redux/signupReducer";
import axios from "axios";
import { setEntered } from "../../redux/enteredReducer";
import { setJWT } from "../../global_logic/userEnter";
import withRouter from "../Utils/WithRouter";

class SignupContainer extends React.Component {
    sendSignupRequest () {
        if (this.props.usernameFieldValue === "" || this.props.passwordFieldValue === "") {
            this.props.changeSignupStatus(SIGNUP_STATUS_INCOMPLETE_DATA);
            return;
        }

        axios.post("http://localhost:5000/sign_up", {
            username: this.props.usernameFieldValue,
            password: this.props.passwordFieldValue,
            birthdate: this.props.birthdate,
            gender: this.props.isMale,
        }).then(res => {
            let result = res.data.result;
            
            this.props.changeSignupStatus({
                "success": SIGNUP_STATUS_SUCCESS,
                "invalid data": SIGNUP_STATUS_INVALID_DATA,
                "user already exists": SIGNUP_STATUS_ALREADY_EXISTS,
                "younger than 18 are prohibited": SIGNUP_STATUS_TOO_YOUNG,
            }[result] ?? SIGNUP_STATUS_NONE);

            if (result === "success") {
                setJWT(res.data.jwtToken);
                this.props.setEntered(res.data.username);
                this.props.router.navigate("/");
            } 
        });
    }

    render () {
        return <Signup {...this.props} sendSignupRequest={this.sendSignupRequest.bind(this)}/>;
    }
}

const mapStateToProps = state => ({
    usernameFieldValue: state.signup.usernameFieldValue,
    passwordFieldValue: state.signup.passwordFieldValue,
    isMale: state.signup.isMale,
    birthdate: state.signup.birthdate,
    signupStatus: state.signup.signupStatus,
});

const mapDispatchToProps = {
    updateUsername: updateSignupUsername,
    updatePassword: updateSignupPassword,
    updateBirthdate,
    updateSex,
    changeSignupStatus,
    setEntered,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignupContainer));