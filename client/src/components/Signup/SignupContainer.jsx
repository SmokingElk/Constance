import React from "react";
import Signup from "./Signup";
import { connect } from "react-redux";
import {
    SIGNUP_STATUS_ALREADY_EXISTS,
    SIGNUP_STATUS_INCOMPLETE_DATA,
    SIGNUP_STATUS_INVALID_DATA,
    SIGNUP_STATUS_SUCCESS,
    changeSignupStatus,
    setSignupFetching,
    updateBirthdate,
    updateSex,
    updateSignupPassword,
    updateSignupUsername,
} from "../../redux/signupReducer";
import axios from "axios";
import { setEntered } from "../../redux/enteredReducer";
import { setJWT } from "../../global_logic/userEnter";
import withRouter from "../Utils/WithRouter";

class SignupContainer extends React.Component {
    sendSignupRequest() {
        if (
            this.props.usernameFieldValue === "" ||
            this.props.passwordFieldValue === "" ||
            this.props.birthdate === ""
        ) {
            this.props.changeSignupStatus(SIGNUP_STATUS_INCOMPLETE_DATA);
            return;
        }

        this.props.setSignupFetching(true);

        axios
            .post("http://localhost:5000/api/v1/user/sign_up", {
                username: this.props.usernameFieldValue,
                password: this.props.passwordFieldValue,
                birthdate: this.props.birthdate,
                sex: this.props.isMale,
            })
            .then(
                (res) => {
                    this.props.changeSignupStatus(SIGNUP_STATUS_SUCCESS);
                    setJWT(res.data.jwtToken);

                    this.props.updateUsername("");
                    this.props.updatePassword("");

                    this.props.setEntered(res.data.username, res.data.sex);
                    this.props.router.navigate("/");
                },
                (error) => {
                    let status = error.response.status;
                    if (status === 400) this.props.changeSignupStatus(SIGNUP_STATUS_INVALID_DATA);
                    if (status === 409) this.props.changeSignupStatus(SIGNUP_STATUS_ALREADY_EXISTS);
                },
            )
            .finally(() => {
                this.props.setSignupFetching(false);
            });
    }

    render() {
        return <Signup {...this.props} sendSignupRequest={this.sendSignupRequest.bind(this)} />;
    }
}

const mapStateToProps = (state) => ({
    usernameFieldValue: state.signup.usernameFieldValue,
    passwordFieldValue: state.signup.passwordFieldValue,
    isMale: state.signup.isMale,
    birthdate: state.signup.birthdate,
    signupStatus: state.signup.signupStatus,
    isFetching: state.signup.isFetching,
});

const mapDispatchToProps = {
    updateUsername: updateSignupUsername,
    updatePassword: updateSignupPassword,
    updateBirthdate,
    updateSex,
    changeSignupStatus,
    setSignupFetching,
    setEntered,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignupContainer));
