import classes from "./MyProfile.module.css";
import photoPlaceholder from "../../assets/imgs/teamlid_avatar.jpg";

const MyProfile = props => {

    const onFirstnameChange = event => {
        props.updateFirstname(event.target.value);
        props.requestProfileDataUpdate({firstname: event.target.value});
    };

    const onLastnameChange = event => {
        props.updateLastname(event.target.value);
        props.requestProfileDataUpdate({lastname: event.target.value});
    };

    const onSocialChange = event => {
        props.updateSocial(event.target.value);
        props.requestProfileDataUpdate({social: event.target.value});
    };

    const onPhoneChange = event => {
        props.updatePhone(event.target.value);
        props.requestProfileDataUpdate({phone: event.target.value});
    };

    return (
        <div>
            <img className={classes.profile_img} src={`static/imgs/${props.photoName}`} onClick={() => props.selectPhoto()}/>

            <div>
                <textarea value={props.firstnameFieldValue} placeholder="firstname" onChange={onFirstnameChange}></textarea>
            </div>

            <div>
                <textarea value={props.lastnameFieldValue} placeholder="lastname" onChange={onLastnameChange}></textarea>
            </div>

            <div>
                <textarea value={props.socialFieldValue} placeholder="social" onChange={onSocialChange}></textarea>
            </div>

            <div>
                <input type="tel" pattern="+7([0-9]{3})[0-9]{3}-[0-9]{3}" placeholder="+7(999)999-99-99" value={props.phoneFieldValue} onChange={onPhoneChange} />
            </div>
        </div>
    );
}

export default MyProfile;