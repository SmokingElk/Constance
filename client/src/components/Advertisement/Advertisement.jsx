import classes from './Advertisement.module.css';
import avatar from '../../assets/imgs/teamlid_avatar.jpg';

const Advertisement = props => {
    return (
        <div className={classes.body}>
            <div className={classes.layout}>
                <img src={avatar} className={classes.avatar} />
                <div className={classes.textBlock}>
                    <div className={classes.title}>Анна в 300 метрах от вас</div>
                    <div className={classes.description}>Ищу послушных мальчиков для разработки IT-проекта.</div>
                </div>
            </div>
        </div>
    );
}

export default Advertisement;