import Container from "../Utils/Container/Container";
import classes from "./Search.module.css";
import UserCard from "./UserCard/UserCard";

const createCards = foundedUsersData => {
    let res = foundedUsersData.map((e, i) => <UserCard
    ratingPosition={i}
    name={e.firstname}
    aboutMe={e.about_me}
    photo={e.photo}
    rate={e.rate}
    userId={e.id}
    />);

    return res;
};

const Search = props => {
    const cards = createCards(props.foundedUsersData);
    
    return (
        <Container>
            <div className={classes.cardsContainer}>
                {cards}
            </div>
            
            {!props.isEnded && <button className={classes.loadMoreBtn} onClick={() => props.loadNextPack()}>load more</button>}
        </Container>
    );
}

export default Search;