import React from "react";
import Advertisement from "./Advertisement";
import { connect } from "react-redux";
 
class AdvertisementContainer extends React.Component {
    componentDidMount () {

    }

    render () {
        return <Advertisement />
    }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(AdvertisementContainer);