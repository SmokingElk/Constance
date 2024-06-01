const SET_ENTERED = "SET-ENTERED";
const SET_UNENTERED = "SET-UNENTERED";

/*
Редьюсер для обработки состояния входа пользователя в приложение.
 */

const initialState = {
    demo: false,
    isUserEntered: false,
    username: "",
    sex: true,
};

const enteredReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ENTERED: {
            return {
                ...state,
                isUserEntered: true,
                username: action.username,
                sex: action.sex,
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

export const setEntered = (username, sex = true) => ({type: SET_ENTERED, username, sex});
export const setUnentered = () => ({type: SET_UNENTERED});

export default enteredReducer;