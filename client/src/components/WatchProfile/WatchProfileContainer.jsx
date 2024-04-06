import React from "react";
import WatchProfile from "./WatchProfile";
import { connect } from "react-redux";
import withRouter from "../Utils/WithRouter";
import { setWatchProfileData } from "../../redux/watchProfileReducer";
import axios from "axios";
import { getJWT } from "../../global_logic/userEnter";

class WatchProfileContainer extends React.Component {
    componentDidMount () {
        if (this.props.demo) return;

        axios.post("http://localhost:5000/get_watch_profile_data", {
            jwt: getJWT(),
            id: this.props.router?.params?.userId ?? 0,
        }).then(res => {
            if (res.data.result === "user is not login") {
                this.props.router.navigate("/login");
                return;
            }

            if (res.data.result === "requested user does not exist") {
                return;
            }

            this.props.setProfileData(res.data.profileData);
        });
    }

    render () {
        return <WatchProfile {...this.props}></WatchProfile>;
    }
}

const mapStateToProps = state => ({
    demo: state.watchProfile.demo, 
    profileData: state.watchProfile.profileData,
});

const mapDispatchToProps = {
    setProfileData: setWatchProfileData,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WatchProfileContainer));