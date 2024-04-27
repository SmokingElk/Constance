import Container from "../Utils/Container/Container";
import classes from "./Search.module.css";
import UserCard from "./UserCard/UserCard";

const createCards = (foundedUsersData, userSex) => {
    let res = foundedUsersData.map((e, i) => <UserCard
    ratingPosition={i}
    name={e.firstname}
    aboutMe={e.about_me}
    photo={e.photo}
    rate={e.rate}
    location={e.location ?? "Location placeholder"}
    userId={e.id}
    currentSex={userSex}
    />);

    return res;
};

const Search = props => {
    const cards = createCards(props.foundedUsersData, props.userSex);
    const loadMoreBtn = <button 
    className={classes.loadMoreBtn + " " + (props.userSex ? classes.pink : "")} 
    onClick={() => props.loadNextPack()}>load more</button>;
    
    return (
        <Container>
            <div className={classes.body}>
                <div className={classes.content}>
                    <div className={classes.cardsContainer}>
                        {cards}
                    </div>
                
                    {!props.isEnded && loadMoreBtn}
                </div>
            </div>
            
        </Container>
    );
}

export default Search;