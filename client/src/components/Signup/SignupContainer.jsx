import React from "react";
import Signup from "./Signup";
import { connect } from "react-redux";
import { SIGNUP_STATUS_ALREADY_EXISTS, SIGNUP_STATUS_INCOMPLETE_DATA, SIGNUP_STATUS_INVALID_DATA, SIGNUP_STATUS_NONE, SIGNUP_STATUS_SUCCESS, changeSignupStatus, updateSignupPassword, updateSignupUsername } from "../../redux/signupReducer";
import axios from "axios";

class SignupContainer extends React.Component {
    sendSignupRequest () {
        if (this.props.usernameFieldValue === "" || this.props.passwordFieldValue === "") {
            this.props.changeSignupStatus(SIGNUP_STATUS_INCOMPLETE_DATA);
            return;
        }

        axios.post("http://localhost:5000/sign_up", {
            username: this.props.usernameFieldValue,
            password: this.props.passwordFieldValue,
        }).then(res => {
            let result = res.data.result;
            
            this.props.changeSignupStatus({
                "success": SIGNUP_STATUS_SUCCESS,
                "invalid data": SIGNUP_STATUS_INVALID_DATA,
                "user already exists": SIGNUP_STATUS_ALREADY_EXISTS,
            }[result] ?? SIGNUP_STATUS_NONE);
        });
    }

    render () {
        return <Signup {...this.props} sendSignupRequest={this.sendSignupRequest.bind(this)}/>;
    }
}

const mapStateToProps = state => ({
    usernameFieldValue: state.signup.usernameFieldValue,
    passwordFieldValue: state.signup.passwordFieldValue,
    signupStatus: state.signup.signupStatus,
});

const mapDispatchToProps = {
    updateUsername: updateSignupUsername,
    updatePassword: updateSignupPassword,
    changeSignupStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupContainer);