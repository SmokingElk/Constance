import React from "react";
import MyProfile from "./MyProfile";
import { connect } from "react-redux";
import { updateMyProfileFirstname, updateMyProfileLastname, updateMyProfilePhone, updateMyProfilePhoto, updateMyProfileSocial } from "../../redux/myProfileReducer";
import axios from "axios";
import { getJWT } from "../../global_logic/userEnter";
import withRouter from "../Utils/WithRouter";

class MyProfileContainer extends React.Component {
    componentDidMount () {
        if (this.props.demo) return;

        axios.get("http://localhost:5000/api/v1/profile/get_data_to_edit", {
            params: { jwtToken: getJWT() },
        }).then(res => {
            let profile = res.data;

            this.props.updateFirstname(profile.firstname);
            this.props.updateLastname(profile.lastname);
            this.props.updateSocial(profile.social);
            this.props.updatePhone(profile.phone);
            this.props.updatePhoto(profile.photo);
        }).catch(error => {
            this.props.router.navigate("/login");
        });
    }

    requestProfileDataUpdate (patch) {
        if (this.props.demo) return;

        axios.put("http://localhost:5000/api/v1/profile/patch_text_data", {
            patch,
            jwtToken: getJWT(),
        }).catch(error => {
            let status = error.response.status;
            if (status === 401) this.props.router.navigate("/login");
            if (status === 404) return;
        });
    }

    requestProfilePhotoUpdate (photoFile) {
        if (this.props.demo) return;

        let formData = new FormData();
    	formData.append("file", photoFile, "image");
        formData.append("jwtToken", getJWT());

        axios.put("http://localhost:5000/api/v1/profile/set_photo", formData).then(res => {
            console.log(res);
            this.props.updatePhoto(res.data.photoName);
        }).catch(error => {
            this.props.router.navigate("/login");
        });
    }

    selectPhoto () {
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

    render () {
        return <MyProfile {...this.props} 
        requestProfileDataUpdate={this.requestProfileDataUpdate.bind(this)} 
        selectPhoto={this.selectPhoto.bind(this)}></MyProfile>;
    }
}

const mapStateToProps = state => ({
    demo: state.myProfile.demo,

    firstnameFieldValue: state.myProfile.firstnameFieldValue,
    lastnameFieldValue: state.myProfile.lastnameFieldValue,
    socialFieldValue: state.myProfile.socialFieldValue,
    phoneNumberFieldValue: state.myProfile.phoneNumberFieldValue,
    photoName: state.myProfile.photoName,
});

const mapDispathToProps = {
    updateFirstname: updateMyProfileFirstname,
    updateLastname: updateMyProfileLastname,
    updateSocial: updateMyProfileSocial,
    updatePhone: updateMyProfilePhone,
    updatePhoto: updateMyProfilePhoto,
};

export default connect(mapStateToProps, mapDispathToProps)(withRouter(MyProfileContainer));