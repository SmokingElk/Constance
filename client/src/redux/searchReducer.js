const RESET = "RESET";
const ADD_PACK = "ADD-PACK";
const SET_FETCHING = "SET-FETCHING";

/*
Редьюсер для управления состоянием экрана поиска.
 */ 

const initialState = {
    demo: false,

    isEnded: false,
    packsLoaded: 0,
    foundedUsersData: [],

    isFetching: false,
};

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESET: {
            return {
                ...state,
                isEnded: false,
                packsLoaded: 0,
                foundedUsersData: [],
            }
        }
    
        case ADD_PACK: {
            return {
                ...state,
                isEnded: action.isEnded,
                packsLoaded: state.packsLoaded + 1,
                foundedUsersData: [
                    ...state.foundedUsersData,
                    ...action.pack,
                ]
            }
        }

        case SET_FETCHING: {
            return {
                ...state,
                isFetching: action.value,
            }
        }

        default:
            return state;
    }
}

export const resetSearchResults = () => ({type: RESET});
export const addSearchPack = (pack, isEnded) => ({type: ADD_PACK, pack, isEnded});
export const setSearchFetching = value => ({type: SET_FETCHING, value});

export default searchReducer;