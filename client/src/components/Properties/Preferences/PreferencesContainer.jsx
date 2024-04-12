import React from "react";
import { connect } from "react-redux";
import Preferences from "./Preferences";

class PreferencesContainer extends React.Component {
    componentDidMount () {

    }

    render () {
        return <Preferences {...this.props} />
    }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(PreferencesContainer);