import classes from "./MyProfile.module.css";
import Container from "../Utils/Container/Container";
import Loader from "../Utils/Loader/Loader";
import SavingIndicator from "../Utils/SavingIndicator/SavingIndicator";
import PhotoPlaceholder from "../../assets/imgs/photo_placeholder.png";
import Checkbox from "../Utils/Checkbox/Checkbox";
import Button from "../Utils/Button/Button";

/*
Компонент страницы профиля пользователя. Отображает данные профиля и позволяет их редактировать.
 */ 

const MyProfile = (props) => {
    const onFirstnameChange = (event) => {
        props.updateFirstname(event.target.value);
        props.requestProfileDataUpdate({ firstname: event.target.value });
    };

    const onLastnameChange = (event) => {
        props.updateLastname(event.target.value);
        props.requestProfileDataUpdate({ lastname: event.target.value });
    };

    const onSocialChange = (event) => {
        props.updateSocial(event.target.value);
        props.requestProfileDataUpdate({ social: event.target.value });
    };

    const onAboutMeChange = (event) => {
        props.updateAboutMe(event.target.value);
        props.requestProfileDataUpdate({ about_me: event.target.value });
    };

    const onLocationChange = (event) => {
        props.updateLocation(event.target.value);
        props.requestProfileDataUpdate({ location: event.target.value });
    };

    const onSearchIncludeChange = () => {
        props.updateIncludeInSearch(!props.includeInSearch);
        props.requestProfileDataUpdate({ include_in_search: !props.includeInSearch });
    };

    const onPhoneChange = (event) => {
        props.updatePhone(event.target.value);
        props.requestProfileDataUpdate({ phone_number: event.target.value });
    };

    const photoPath = props.photoName
        ? `http://localhost:5000/static/images/${props.photoName}`
        : PhotoPlaceholder;

    return (
        <Container>
            <div className={classes.layout}>
                <div className={classes.body}>
                    <div className={classes.title}>
                        Профиль {props.isFetching && <Loader size={40} black={true} />}
                    </div>
                    <div className={classes.columns}>
                        <div className={classes.imgColumn}>
                            <img
                                className={classes.profile_img}
                                src={photoPath}
                                onClick={() => props.selectPhoto()}
                                alt="avatar"
                            />
                        </div>

                        <div className={classes.fieldsColumn}>
                            <div className={classes.fieldBlock}>
                                <div className={classes.label}>Имя</div>
                                <input
                                    type="text"
                                    className={"inputField"}
                                    value={props.firstnameFieldValue}
                                    placeholder="firstname"
                                    onChange={onFirstnameChange}
                                ></input>
                            </div>

                            <div className={classes.fieldBlock}>
                                <div className={classes.label}>Фамилия</div>
                                <input
                                    type="text"
                                    className={"inputField"}
                                    value={props.lastnameFieldValue}
                                    placeholder="lastname"
                                    onChange={onLastnameChange}
                                ></input>
                            </div>

                            <div className={classes.fieldBlock}>
                                <div className={classes.label}>Профиль в соцсети</div>
                                <input
                                    type="text"
                                    className={"inputField"}
                                    value={props.socialFieldValue}
                                    placeholder="social"
                                    onChange={onSocialChange}
                                ></input>
                            </div>

                            <div className={classes.fieldBlock}>
                                <div className={classes.label}>Номер мобильного телефона</div>
                                <input
                                    className={"inputField"}
                                    type="tel"
                                    pattern="+7([0-9]{3})[0-9]{3}-[0-9]{3}"
                                    placeholder="+7(999)999-99-99"
                                    value={props.phoneNumberFieldValue}
                                    onChange={onPhoneChange}
                                />
                            </div>

                            <div className={classes.fieldBlock}>
                                <div className={classes.label}>Местоположение</div>
                                <input
                                    className={"inputField"}
                                    type="text"
                                    placeholder="Москва"
                                    value={props.locationFieldValue}
                                    onChange={onLocationChange}
                                ></input>
                            </div>

                            <div className={classes.fieldBlock}>
                                <div className={classes.label}>Обо мне</div>
                                <textarea
                                    maxLength={300}
                                    className={"inputField " + classes.aboutMe}
                                    type="text"
                                    placeholder="Бог математики, лучший программист."
                                    value={props.aboutMeFieldValue}
                                    onChange={onAboutMeChange}
                                ></textarea>
                            </div>

                            <div className={classes.fieldBlock + " " + classes.oneRow}>
                                <Checkbox
                                    value={props.includeInSearch}
                                    onClick={onSearchIncludeChange}
                                />
                                <div className={classes.label}>Включать меня в поиск</div>
                            </div>
                        </div>
                    </div>

                    <div className={classes.logoutContainer}>
                        <Button text="выйти" onClick={props.logout}/>
                    </div>
                </div>
            </div>

            <SavingIndicator saving={props.isPatching} />
        </Container>
    );
};

export default MyProfile;
