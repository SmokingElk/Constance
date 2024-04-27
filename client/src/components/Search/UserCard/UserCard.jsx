import { NavLink } from "react-router-dom";
import classes from "./UserCard.module.css";

const UserCard = props => {
    const rateMapped = Math.max(0, Math.round(props.rate * 100));
    
    return (
        <div className={classes.body}>
            <div className={classes.ratingPositionNumber}>{props.ratingPosition + 1}</div>
            <img className={classes.userPhoto} src={`http://localhost:5000/static/images/${props.photo}`}/>
            <NavLink className={classes.name} to={`/profile/${props.userId}`}>{props.name}</NavLink>
            <div className={classes.location}>{props.location}</div>
            <div className={classes.aboutMe}>{props.aboutMe}</div>
            <div className={classes.rate}>{rateMapped}/100</div>
        </div>
    );
}

export default UserCard;