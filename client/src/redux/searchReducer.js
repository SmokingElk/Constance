const RESET = "RESET";
const ADD_PACK = "ADD-PACK";

const initialState = {
    demo: true,

    isEnded: false,
    packsLoaded: 0,
    foundedUsersData: [],
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

        default:
            return state;
    }
}

export const resetSearchResults = () => ({type: RESET});
export const addSearchPack = (pack, isEnded) => ({type: ADD_PACK, pack, isEnded});

export default searchReducer;