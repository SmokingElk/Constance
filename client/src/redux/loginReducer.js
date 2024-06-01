const UPDATE_USERNAME = "UPDATE-USERNAME";
const UPDATE_PASSWORD = "UPDATE-PASSWORD";
const CHANGE_AUTH_STATUS = "CHANGE-AUTH-STATUS";
const SET_FETCHING = "SET-FETCHING";

export const AUTH_STATUS_NONE = "AUTH-NONE";
export const AUTH_STATUS_INCORRECT_DATA = "AUTH-STATUS-INCORRECT-DATA";
export const AUTH_STATUS_INCOMPLETE_DATA = "AUTH-STATUS-INCOMPLETE-DATA";
export const AUTH_STATUS_SUCCESS = "AUTH-STATUS-SUCCESS";

/*
Редьюсер для управления состоянием экрана входа.
 */ 

const initialState = {
    usernameFieldValue: "",
    passwordFieldValue: "",
    authStatus: AUTH_STATUS_NONE,

    isFetching: false,
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USERNAME: {
            return {
                ...state,
                authStatus: AUTH_STATUS_NONE,
                usernameFieldValue: action.username,
            }
        }

        case UPDATE_PASSWORD: {
            return {
                ...state,
                authStatus: AUTH_STATUS_NONE,
                passwordFieldValue: action.password,
            }
        }

        case CHANGE_AUTH_STATUS: {
            const authStatusVariants = [
                AUTH_STATUS_NONE, 
                AUTH_STATUS_INCORRECT_DATA, 
                AUTH_STATUS_INCOMPLETE_DATA, 
                AUTH_STATUS_SUCCESS
            ];
            
            if (!authStatusVariants.includes(action.status)) {
                throw new Error(`Invalid status value: ${action.status}`);
            }

            return {
                ...state,
                authStatus: action.status,
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

export const updateLoginUsername = username => ({type: UPDATE_USERNAME, username});
export const updateLoginPassword = password => ({type: UPDATE_PASSWORD, password});
export const changeAuthStatus = status => ({type: CHANGE_AUTH_STATUS, status});
export const setLoginFetching = value => ({type: SET_FETCHING, value});

export default loginReducer;