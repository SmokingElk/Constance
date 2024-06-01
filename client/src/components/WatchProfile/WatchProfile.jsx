import Container from "../Utils/Container/Container";
import Loader from "../Utils/Loader/Loader";
import classes from "./WatchProfile.module.css";
import PhotoPlaceholder from "../../assets/imgs/photo_placeholder.png";

/*
Компонент экрана просмотра профиля пользователя (не текущего).
 */ 

const WatchProfile = (props) => {
    const profileData = props.profileData;
    const birthdate = profileData.birthdate.split("-").reverse().join(".");

    const photoPath = profileData.photoName
        ? `http://localhost:5000/static/images/${profileData.photoName}`
        : PhotoPlaceholder;

    return (
        <Container>
            <div className={classes.layout}>
                <div className={classes.body}>
                    <div className={classes.title}>
                        Профиль пользователя {profileData.username}{" "}
                        {props.isFetching && <Loader size={40} black={true} />}
                    </div>

                    <div className={classes.columns}>
                        <div className={classes.imgColumn}>
                            <img className={classes.profilePhoto} src={photoPath} alt="avatar" />
                        </div>

                        <div className={classes.fieldsColumn}>
                            <div className={classes.label}>Имя</div>
                            <div className={classes.profileDataPlace}>{profileData.firstname}</div>

                            <div className={classes.label}>Фамилия</div>
                            <div className={classes.profileDataPlace}>{profileData.lastname}</div>

                            <div className={classes.label}>Профиль в соцсети</div>
                            <div className={classes.profileDataPlace}>{profileData.social}</div>

                            <div className={classes.label}>Номер мобильного телефона</div>
                            <div className={classes.profileDataPlace}>{profileData.phone}</div>

                            <div className={classes.label}>Дата рождения</div>
                            <div className={classes.profileDataPlace}>{birthdate}</div>

                            <div className={classes.label}>Местоположение</div>
                            <div className={classes.profileDataPlace}>{profileData.location}</div>

                            <div className={classes.label}>Обо мне</div>
                            <div className={classes.profileDataPlace + " " + classes.tallPlace}>
                                {profileData.about_me}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default WatchProfile;
