import classes from "./WatchProfile.module.css";

const WatchProfile = props => {
    const profileData = props.profileData;

    return (
        <div>
            <img className={classes.profile_photo} src={`http://localhost:5000/static/images/${profileData.photoName}`} />
            <div>{profileData.firstname}</div>
            <div>{profileData.lastname}</div>
            <div>{profileData.social}</div>
            <div>{profileData.phone}</div>
            <div>{profileData.birthdate}</div>
        </div>
    );
}

export default WatchProfile;