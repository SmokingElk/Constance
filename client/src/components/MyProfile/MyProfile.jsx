import classes from "./MyProfile.module.css";
import photoPlaceholder from "../../assets/imgs/teamlid_avatar.jpg";
import Container from "../Utils/Container/Container";

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
        props.requestProfileDataUpdate({phone_number: event.target.value});
    };

    return (
        <Container>
            <div className={classes.layout}>
                <div className={classes.body}>
                    <div className={classes.title}>Profile</div>
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
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default MyProfile;