import classes from "./Background.module.css";
import BackgroundImage from "../../assets/imgs/background.png";

const Background = props => {
    return (
        <div className={classes.container}>
            <img className={classes.image} src={BackgroundImage} />
        </div>
    );
}

export default Background;