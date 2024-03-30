import React from "react";
import Advertisement from "./Advertisement";
import { connect } from "react-redux";
import { openAdvertisement } from "../../redux/advertisementReducer";
 
class AdvertisementContainer extends React.Component {
    componentDidMount () {
        setTimeout(() => this.props.openAdvertisement(), this.props.openDelay);
    }

    render () {
        return <Advertisement isOpen={this.props.isOpen} />
    }
}

const mapStateToProps = state => ({
    isOpen: state.advertisement.isOpen,
    openDelay: state.advertisement.openDelay,
});

const mapDispatchToProps = {
    openAdvertisement, 
};

export default connect(mapStateToProps, mapDispatchToProps)(AdvertisementContainer);