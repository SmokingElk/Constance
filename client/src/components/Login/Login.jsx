import classes from "./Login.module.css"

const Login = props => {
    const onUsernameChange = event => {
        props.updateUsername(event.target.value);
    };

    const onPasswordChange = event => {
        props.updatePassword(event.target.value);
    };

    return (
        <div>
            <div>Username</div>
            <div>
                <textarea onChange={onUsernameChange} value={props.usernameFieldValue}></textarea>
            </div>

            <div>Password</div>
            <div>
                <textarea onChange={onPasswordChange} value={props.passwordFieldValue}></textarea>
            </div>

            <button>login</button>
        </div>
    );
}

export default Login;