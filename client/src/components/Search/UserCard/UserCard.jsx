import { NavLink } from "react-router-dom";
import classes from "./UserCard.module.css";

const UserCard = props => {
    const rateMapped = Math.max(0, Math.round(props.rate * 100));
    const profilePath = `/profile/${props.userId}`;
    
    return (
        <div className={classes.body}>
            <div className={classes.ratingPositionNumber + " " + (props.currentSex ? classes.pink : "")}>{props.ratingPosition + 1}</div>
            <div className={classes.content}>

                <div className={classes.contentLayout}>
                    <NavLink to={profilePath}>
                        <img className={classes.userPhoto} src={`http://localhost:5000/static/images/${props.photo}`}/>
                    </NavLink>

                    <div>
                        <div className={classes.contentHeader}>
                            <NavLink className={classes.name} to={profilePath}>{props.name}</NavLink>
                            <div className={classes.location}>{props.location}</div>
                            <div className={classes.rate}>{rateMapped}/100</div>
                        </div>

                        <div className={classes.aboutMe}>{props.aboutMe}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserCard;