import React from "react";
import SavingIndicator from "../../../Utils/SavingIndicator/SavingIndicator";
import { connect } from "react-redux";

class SavingWrapper extends React.Component {
    render() {
        return <SavingIndicator saving={this.props.isPatching} />;
    }
}

const mapStateToProps = (state) => ({
    isPatching: state.preferences.isPatching,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SavingWrapper);
