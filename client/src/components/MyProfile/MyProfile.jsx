import classes from "./MyProfile.module.css";
import photoPlaceholder from "../../assets/imgs/teamlid_avatar.jpg";
import checkedMark from "../../assets/imgs/check_mark.svg";
import Container from "../Utils/Container/Container";
import Loader from "../Utils/Loader/Loader";

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

    const onAboutMeChange = event => {
        props.updateAboutMe(event.target.value);
        props.requestProfileDataUpdate({about_me: event.target.value});
    };

    const onLocationChange = event => {
        props.updateLocation(event.target.value);
        props.requestProfileDataUpdate({location: event.target.value});
    };

    const onPhoneChange = event => {
        props.updatePhone(event.target.value);
        props.requestProfileDataUpdate({phone_number: event.target.value});
    };

    let savingContent = props.isPatching ? <><Loader size={30} /> saving...</> :
    <><img src={checkedMark} className={classes.checkedMark} /> saved</>

    return (
        <Container>
            <div className={classes.layout}>
                <div className={classes.body}>
                    <div className={classes.title}>Profile {props.isFetching && <Loader size={40} black={true} />}</div>
                    <div className={classes.columns}>
                        <div className={classes.imgColumn}>
                            <img className={classes.profile_img} src={`http://localhost:5000/static/images/${props.photoName}`} onClick={() => props.selectPhoto()}/>
                        </div>
                        
                        <div className={classes.fieldsColumn}>
                            <div className={classes.fieldBlock}>
                                <div className={classes.label}>Firstname</div>
                                <input type="text" className={"inputField"} value={props.firstnameFieldValue} placeholder="firstname" onChange={onFirstnameChange}></input>
                            </div>

                            <div className={classes.fieldBlock}>
                                <div className={classes.label}>Lastname</div>
                                <input type="text" className={"inputField"} value={props.lastnameFieldValue} placeholder="lastname" onChange={onLastnameChange}></input>
                            </div>

                            <div className={classes.fieldBlock}>
                                <div className={classes.label}>Social media</div>
                                <input type="text" className={"inputField"} value={props.socialFieldValue} placeholder="social" onChange={onSocialChange}></input>
                            </div>

                            <div className={classes.fieldBlock}>
                                <div className={classes.label}>Phone number</div>
                                <input className={"inputField"} type="tel" pattern="+7([0-9]{3})[0-9]{3}-[0-9]{3}" placeholder="+7(999)999-99-99" value={props.phoneNumberFieldValue} onChange={onPhoneChange} />
                            </div>

                            <div className={classes.fieldBlock}>
                                <div className={classes.label}>Location</div>
                                <input className={"inputField"} type="text" placeholder="Moscow" value={props.locationFieldValue} onChange={onLocationChange}></input>
                            </div>

                            <div className={classes.fieldBlock}>
                                <div className={classes.label}>About me</div>
                                <textarea maxLength={300} className={"inputField" + " " + classes.aboutMe} type="text" placeholder="God of math, best programmer." value={props.aboutMeFieldValue} onChange={onAboutMeChange}></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className={classes.savingIndicator + " " + (props.isPatching ? classes.active : "")}>
                {savingContent}
            </div>
        </Container>
    );
}

export default MyProfile;