import React from "react";
import { connect } from "react-redux";
import Login from "./Login";
import { AUTH_STATUS_INCOMPLETE_DATA, AUTH_STATUS_INCORRECT_DATA, AUTH_STATUS_NONE, AUTH_STATUS_SUCCESS, changeAuthStatus, updateLoginPassword, updateLoginUsername } from "../../redux/loginReducer";
import axios from "axios";
import { useNavigate } from "react-router";
import { setJWT } from "../../global_logic/userEnter";
import { setEntered } from "../../redux/enteredReducer";
import withRouter from "../Utils/WithRouter";

class LoginContainer extends React.Component {
    sendAuthRequest () {
        if (this.props.usernameFieldValue === "" || this.props.passwordFieldValue === "") {
            this.props.changeAuthStatus(AUTH_STATUS_INCOMPLETE_DATA);
            return;
        }

        axios.get("http://localhost:5000/api/v1/user/auth", {
            params: {
                username: this.props.usernameFieldValue,
                password: this.props.passwordFieldValue,
            }
        }).then(res => {
            this.props.changeAuthStatus(AUTH_STATUS_SUCCESS);
            setJWT(res.data.jwtToken);
            this.props.setEntered(res.data.username);
            this.props.router.navigate("/");
        }).catch(error => {
            let status = error.response.status;
            if (status === 400) this.props.changeAuthStatus(AUTH_STATUS_INCORRECT_DATA); 
            if (status === 404) this.props.changeAuthStatus(AUTH_STATUS_INCORRECT_DATA);
        });
    }

    render () {
        return <Login {...this.props} sendAuthRequest={this.sendAuthRequest.bind(this)} />
    }
}

const mapStateToProps = state => ({
    usernameFieldValue: state.login.usernameFieldValue,
    passwordFieldValue: state.login.passwordFieldValue,
    authStatus: state.login.authStatus,
});

const mapDispatchToProps = {
    updateUsername: updateLoginUsername,
    updatePassword: updateLoginPassword,
    changeAuthStatus, 
    setEntered,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginContainer));