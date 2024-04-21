import Container from "../Utils/Container/Container";
import classes from "./WatchProfile.module.css";

const WatchProfile = props => {
    const profileData = props.profileData;
    const birthdate = profileData.birthdate.split("-").reverse().join(".");

    return (
        <Container>
            <div className={classes.layout}>
                <div className={classes.body}>
                    <div className={classes.title}>Profile of {props.username}</div>

                    <div className={classes.columns}>
                        <div className={classes.imgColumn}>
                            <img className={classes.profilePhoto} src={`http://localhost:5000/static/images/${profileData.photoName}`} />
                        </div>

                        <div className={classes.fieldsColumn}>
                            <div className={classes.label}>Firstname</div>
                            <div className={classes.profileDataPlace}>{profileData.firstname}</div>

                            <div className={classes.label}>Lastname</div>
                            <div className={classes.profileDataPlace}>{profileData.lastname}</div>

                            <div className={classes.label}>Social media</div>
                            <div className={classes.profileDataPlace}>{profileData.social}</div>

                            <div className={classes.label}>Phone number</div>
                            <div className={classes.profileDataPlace}>{profileData.phone}</div>

                            <div className={classes.label}>Birthdate</div>
                            <div className={classes.profileDataPlace}>{birthdate}</div>

                            <div className={classes.label}>Location</div>
                            <div className={classes.profileDataPlace}>{profileData.location}</div>

                            <div className={classes.label}>About me</div>
                            <div className={classes.profileDataPlace + " " + classes.tallPlace}>{profileData.about_me}</div>
                        </div>
                    </div>  
                </div>
            </div>
        </Container>
    );
}

export default WatchProfile;