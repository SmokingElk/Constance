const UPDATE_USERNAME = "UPDATE-USERNAME";
const UPDATE_PASSWORD = "UPDATE-PASSWORD";
const CHANGE_AUTH_STATUS = "CHANGE-AUTH-STATUS";

export const AUTH_STATUS_NONE = "AUTH-NONE";
export const AUTH_STATUS_INCORRECT_DATA = "AUTH-STATUS-INCORRECT-DATA";

const initialState = {
    usernameFieldValue: "",
    passwordFieldValue: "",
    authStatus: AUTH_STATUS_NONE,
};

const authReducer = (state = initialState, action) => {
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
            if (![AUTH_STATUS_NONE, AUTH_STATUS_INCORRECT_DATA].includes(action.status)) {
                throw new Error(`Invalid status value: ${action.status}`);
            }

            return {
                ...state,
                authStatus: action.status,
            }
        }

        default:
            return state;
    }
}

export const updateUsername = username => ({type: UPDATE_USERNAME, username});
export const updatePassword = password => ({type: UPDATE_PASSWORD, password});
export const changeAuthStatus = password => ({type: CHANGE_AUTH_STATUS, password});

export default authReducer;