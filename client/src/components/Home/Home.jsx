import Footer from "../Footer/Footer";
import Container from "../Utils/Container/Container";
import Spoiler from "../Utils/Spoiler/Spoiler";
import classes from "./Home.module.css";

/*
Компонент домашнего экрана. Практически статический. Содержит информацию о приложении. 
*/ 

const Home = (props) => {
    return (
        <>
            <Container>
                <div className={classes.titleBlock}>
                    <div className={classes.title}>Constance</div>
                    <div className={classes.slogan}>Ты найдёшь того, кого так долго искал</div>
                </div>

                <div className={classes.aboutUsLayout}>
                    <div className={classes.aboutUs}>
                        <div className={classes.aboutUsColumn}>
                            <div className={classes.decryption}>
                                <div>
                                    <strong>CO</strong>uple
                                </div>
                                <div>
                                    <strong>N</strong>umerical
                                </div>
                                <div>
                                    <strong>S</strong>elec<strong>T</strong>ion based on
                                </div>
                                <div>
                                    <strong>A</strong>ffirmative and
                                </div>
                                <div>
                                    <strong>N</strong>egative properties
                                </div>
                                <div>
                                    <strong>C</strong>orr<strong>E</strong>lation
                                </div>
                            </div>

                            <p className={classes.aboutUsParagraph}>
                                Познакомьтесь с партнёром своей мечты с Constance. Более 80
                                характеристик для того, чтобы вы действительно нашли того, кого
                                искали. Наша математическая модель посчитает коэффициенты и составит
                                наилучшую пару из вас и вашего будущего партнёра.
                            </p>

                            <p className={classes.aboutUsParagraph}>
                                Регистрируйтесь, указывайте свои характеристики и выбирайте желаемые
                                характеристики партнёра из разных категорий: внешность, образ жизни,
                                характер, мировоззрение и приобретённый опыт. Затем переходите на
                                вкладку Поиск и выбирайте половинку своей мечты!
                            </p>
                        </div>
                    </div>
                </div>

                <Spoiler
                    title="Инструкция по использованию"
                    isOpen={props.instructionOpen}
                    toggle={props.toggleInstructionOpen}
                >
                    <p>
                        После регистрации пользователь должен заполнить данные профиля, личные
                        характеристики и предпочтения. Для каждого критерия предпочтения существует
                        приоритет. В зависимости от указанного числа, поиск будет отдавать больший
                        приоритет критерию с большим значением позитивного и отрицательного
                        коэффициента. Также отдельно можно указать значение для отрицательных
                        указанных параметров (для указания коэффициента негативной шкалы требуется
                        нажать на строку указать другую шкалу для негативной оценки).
                    </p>

                    <p>
                        Для предпочтений типа "непрерывный" необходимо для каждого значения на
                        графике указать положительную или отрицательную оценку каждого промежутка,
                        для предпочтений типа "дискретный" переставить ползунок слайдера от минимума
                        до максимума в зависимости от желания совпадения критерия, для предпочтений
                        типа "бинарный" необходимо перевести оба коэффициента в положительное
                        положение при ответе да и оба коэффициента в отрицательное положение – для
                        ответа нет, если вам всё равно на критерий стоит оставить масштабирующий
                        коэффициент 0.
                    </p>

                    <p>
                        Пользователь может указывать различные оценки для каждого варианта
                        предпочтения. Подставив числа в формулу, математическая модель на основе
                        всех вариантов среди зарегистрированных и заполнивших характеристики
                        пользователей произведёт оценку каждого пользователя и выстроит их в
                        рейтинг, который основан не тольно на том, насколько подходит человек по
                        характеристикам пользователю, но и в зависимости от попаданий пользователя в
                        предпочтения другого пользователя. Пользователь сможет на вкладке поиск
                        увидеть топ из других пользователей с наивысшим рейтингом, рассмотреть
                        полученные профили и на основе фотографий и краткого описания выбрать свою
                        будущую пару. В профиле каждого пользователя указан предпочтительный способ
                        обращения - связаться с человеком не составит труда. Скорее регистируйтесь,
                        заполняйте анкету, находите вторую половинку и становитесь идеальной парой.
                    </p>
                </Spoiler>
            </Container>

            <Footer />
        </>
    );
};

export default Home;
