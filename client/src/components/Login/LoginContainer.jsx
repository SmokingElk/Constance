import React from "react";
import { connect } from "react-redux";
import Login from "./Login";
import { changeAuthStatus, updatePassword, updateUsername } from "../../redux/authReducer";

class LoginContainer extends React.Component {
    render () {
        return <Login {...this.props} />
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