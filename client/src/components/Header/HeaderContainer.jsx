import React from "react";
import { connect } from "react-redux";
import Header from "./Header";
import { setEntered, setUnentered } from "../../redux/enteredReducer";
import { getJWT, getUserData } from "../../global_logic/userEnter";

class HeaderContainer extends React.Component {
    componentDidMount () {
        if (this.props.demo) return;

        getUserData(res => {
            this.props.setEntered(res.username, res.sex);
        }, () => {
            this.props.setUnentered();
        });
    }

    render () {
        return <Header {...this.props} />;
    }
}

const mapStateToProps = state => ({
    isUserEntered: state.entered.isUserEntered,
    username: state.entered.username,
    sex: state.entered.sex,
    demo: state.entered.demo,
});

const mapDispatchToProps = {
    setEntered,
    setUnentered,
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
