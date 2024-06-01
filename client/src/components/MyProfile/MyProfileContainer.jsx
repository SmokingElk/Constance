import React from "react";
import MyProfile from "./MyProfile";
import { connect } from "react-redux";
import {
    setMyProfileFetching,
    setMyProfilePatching,
    updateMyProfileAboutMe,
    updateMyProfileFirstname,
    updateMyProfileIncludeInSearch,
    updateMyProfileLastname,
    updateMyProfileLocation,
    updateMyProfilePhone,
    updateMyProfilePhoto,
    updateMyProfileSocial,
} from "../../redux/myProfileReducer";
import axios from "axios";
import { getJWT, resetJWT } from "../../global_logic/userEnter";
import withRouter from "../Utils/WithRouter";

/*
Компонент-обертка, для взаимодействия Header с redux-store и сервером.
Также содержит логику, создающую patch данных профиля и его отправку по таймеру.
 */

class MyProfileContainer extends React.Component {
    updateTimerId = -1;
    nextPatch = {};

    componentDidMount() {
        if (this.props.demo) return;

        this.props.setMyProfileFetching(true);

        axios
            .get("http://localhost:5000/api/v1/profile/get_data_to_edit", {
                params: { jwtToken: getJWT() },
            })
            .then((res) => {
                let profile = res.data;

                this.props.updateFirstname(profile.firstname);
                this.props.updateLastname(profile.lastname);
                this.props.updateSocial(profile.social);
                this.props.updatePhone(profile.phone);
                this.props.updateAboutMe(profile.about_me ?? "");
                this.props.updateLocation(profile.location ?? "");
                this.props.updateIncludeInSearch(profile.include_in_search ?? true);
                this.props.updatePhoto(profile.photo);
            })
            .catch((error) => {
                this.props.router.navigate("/login");
            })
            .finally(() => {
                this.props.setMyProfileFetching(false);
            });
    }

    requestProfileDataUpdate(patch) {
        if (this.props.demo) return;

        this.props.setMyProfilePatching(true);

        clearTimeout(this.updateTimerId);

        this.nextPatch = {
            ...this.nextPatch,
            ...patch,
        };

        this.updateTimerId = setTimeout(() => {
            this.updateTimerId = -1;
            let patchData = { ...this.nextPatch };
            this.nextPatch = {};

            axios
                .put("http://localhost:5000/api/v1/profile/patch_text_data", {
                    patch: patchData,
                    jwtToken: getJWT(),
                })
                .catch((error) => {
                    let status = error.response.status;
                    if (status === 401) this.props.router.navigate("/login");
                    if (status === 404) return;
                })
                .finally(() => {
                    if (this.updateTimerId === -1) this.props.setMyProfilePatching(false);
                });
        }, 3000);
    }

    requestProfilePhotoUpdate(photoFile) {
        if (this.props.demo) return;

        let formData = new FormData();
        formData.append("file", photoFile, "image");
        formData.append("jwtToken", getJWT());

        axios
            .put("http://localhost:5000/api/v1/profile/set_photo", formData)
            .then((res) => {
                this.props.updatePhoto(res.data.photoName);
            })
            .catch((error) => {
                this.props.router.navigate("/login");
            });
    }

    selectPhoto() {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/png, image/jpeg");
        input.click();

        input.onchange = () => {
            if (input.files.length === 0) return;
            const file = input.files[0];
            this.requestProfilePhotoUpdate(file);
        };
    }

    logout() {
        resetJWT();
        this.props.router.navigate("/login");
    }

    render() {
        return (
            <MyProfile
                {...this.props}
                requestProfileDataUpdate={this.requestProfileDataUpdate.bind(this)}
                selectPhoto={this.selectPhoto.bind(this)}
                logout={this.logout.bind(this)}
            ></MyProfile>
        );
    }
}

const mapStateToProps = (state) => ({
    demo: state.myProfile.demo,

    firstnameFieldValue: state.myProfile.firstnameFieldValue,
    lastnameFieldValue: state.myProfile.lastnameFieldValue,
    socialFieldValue: state.myProfile.socialFieldValue,
    phoneNumberFieldValue: state.myProfile.phoneNumberFieldValue,
    aboutMeFieldValue: state.myProfile.aboutMeFieldValue,
    locationFieldValue: state.myProfile.locationFieldValue,
    includeInSearch: state.myProfile.includeInSearch,
    photoName: state.myProfile.photoName,
    isFetching: state.myProfile.isFetching,
    isPatching: state.myProfile.isPatching,
});

const mapDispathToProps = {
    updateFirstname: updateMyProfileFirstname,
    updateLastname: updateMyProfileLastname,
    updateSocial: updateMyProfileSocial,
    updatePhone: updateMyProfilePhone,
    updateAboutMe: updateMyProfileAboutMe,
    updateLocation: updateMyProfileLocation,
    updatePhoto: updateMyProfilePhoto,
    updateIncludeInSearch: updateMyProfileIncludeInSearch,
    setMyProfileFetching,
    setMyProfilePatching,
};

export default connect(mapStateToProps, mapDispathToProps)(withRouter(MyProfileContainer));
