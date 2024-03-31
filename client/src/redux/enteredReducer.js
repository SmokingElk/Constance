const SET_ENTERED = "SET-ENTERED";
const SET_UNENTERED = "SET-UNENTERED";

const initialState = {
    demo: false,
    isUserEntered: false,
    username: "",
};

const enteredReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ENTERED: {
            return {
                ...state,
                isUserEntered: true,
                username: action.username,
            }
        }

        case SET_UNENTERED: {
            return {
                ...state,
                isUserEntered: false,
            }
        }
    
        default:
            return state;
    }
}

export const setEntered = username => ({type: SET_ENTERED, username});
export const setUnentered = () => ({type: SET_UNENTERED});

export default enteredReducer;