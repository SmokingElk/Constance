import classes from "./WatchProfile.module.css";

const WatchProfile = props => {
    const profileData = props.profileData;

    return (
        <div>
            <img src={`static/imgs/${profileData.photoName}`} />
            <div>{profileData.firstname}</div>
            <div>{profileData.lastname}</div>
            <div>{profileData.social}</div>
            <div>{profileData.phone}</div>
            <div>{profileData.birthdate}</div>
        </div>
    );
}

export default WatchProfile;