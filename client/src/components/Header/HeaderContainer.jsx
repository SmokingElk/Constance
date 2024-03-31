import React from "react";
import { connect } from "react-redux";
import Header from "./Header";
import { setEntered, setUnentered } from "../../redux/enteredReducer";
import axios from "axios";

class HeaderContainer extends React.Component {
    componentDidMount () {
        if (this.props.demo) return;

        axios.post("http://localhost:5000/userInfo", {
            jwtToken: "",
        }).then(res => {
            let promptResult = res.data.resultStatus;

            if (promptResult === "success") this.props.setEntered(res.data.username);
            else this.props.setUnentered();
        });
    }

    render () {
        return <Header {...this.props} />;
    }
}

const mapStateToProps = state => ({
    isUserEntered: state.entered.isUserEntered,
    username: state.entered.username,
    demo: state.entered.demo,
});

const mapDispatchToProps = {
    setEntered,
    setUnentered,
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
