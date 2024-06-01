import React from "react";
import { toggleHomeInstructionSpoiler } from "../../redux/homeReducer";
import { connect } from "react-redux";
import Home from "./Home";

/*
Компонент-обертка, для взаимодействия Home с redux-store.
 */

class HomeContainer extends React.Component {
    render() {
        return <Home {...this.props} />;
    }
}

const mapStateToProps = (state) => ({
    instructionOpen: state.home.instructionOpen,
});

const mapDispatchToProps = {
    toggleInstructionOpen: toggleHomeInstructionSpoiler,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
