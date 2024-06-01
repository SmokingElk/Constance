import classes from "./Background.module.css";
import BackgroundImage from "../../assets/imgs/background.png";

/* 
Компонент с фоном приложения
*/

const Background = (props) => {
    return (
        <div className={classes.container}>
            <img className={classes.image} src={BackgroundImage} alt="background" />
        </div>
    );
};

export default Background;
