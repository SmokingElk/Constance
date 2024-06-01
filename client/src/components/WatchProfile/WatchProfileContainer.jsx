import React from "react";
import WatchProfile from "./WatchProfile";
import { connect } from "react-redux";
import withRouter from "../Utils/WithRouter";
import { setWatchProfileData, setWatchProfileFetching } from "../../redux/watchProfileReducer";
import axios from "axios";
import { getJWT } from "../../global_logic/userEnter";

/*
Компонент-обертка, для взаимодействия WatchProfile с redux-store и сервером.
 */

class WatchProfileContainer extends React.Component {
    componentDidMount() {
        if (this.props.demo) return;

        let id = Number(this.props.router?.params?.userId ?? 0);

        this.props.setWatchProfileFetching(true);

        axios
            .get(`http://localhost:5000/api/v1/profile/get_data_to_view/${id}`, {
                params: {
                    jwtToken: getJWT(),
                },
            })
            .then((res) => {
                this.props.setProfileData(res.data);
            })
            .catch((error) => {
                let status = error.response.status;
                if (status === 401) this.props.router.navigate("/login");
                if (status === 404) return;
            })
            .finally(() => {
                this.props.setWatchProfileFetching(false);
            });
    }

    render() {
        return <WatchProfile {...this.props}></WatchProfile>;
    }
}

const mapStateToProps = (state) => ({
    demo: state.watchProfile.demo,
    profileData: state.watchProfile.profileData,
    isFetching: state.watchProfile.isFetching,
});

const mapDispatchToProps = {
    setProfileData: setWatchProfileData,
    setWatchProfileFetching,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WatchProfileContainer));
