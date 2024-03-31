import React from "react";
import { connect } from "react-redux";
import Login from "./Login";
import { AUTH_STATUS_INCOMPLETE_DATA, AUTH_STATUS_INCORRECT_DATA, AUTH_STATUS_NONE, AUTH_STATUS_SUCCESS, changeAuthStatus, updatePassword, updateUsername } from "../../redux/authReducer";
import axios from "axios";

class LoginContainer extends React.Component {
    sendAuthRequest () {
        if (this.props.usernameFieldValue === "" || this.props.passwordFieldValue === "") {
            this.props.changeAuthStatus(AUTH_STATUS_INCOMPLETE_DATA);
            return;
        }

        axios.post("http://localhost:5000/auth", {
            username: this.props.usernameFieldValue,
            password: this.props.passwordFieldValue,
        }).then(res => {
            let authResult = res.data.result;

            this.props.changeAuthStatus({
                "success": AUTH_STATUS_SUCCESS,
                "invalid data": AUTH_STATUS_INCORRECT_DATA,
            }[authResult] ?? AUTH_STATUS_NONE);
        });
    }

    render () {
        return <Login {...this.props} sendAuthRequest={this.sendAuthRequest.bind(this)} />
    }
}

const mapStateToProps = state => ({
    usernameFieldValue: state.auth.usernameFieldValue,
    passwordFieldValue: state.auth.passwordFieldValue,
    authStatus: state.auth.authStatus,
});

const mapDispatchToProps = {
    updateUsername,
    updatePassword,
    changeAuthStatus, 
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);