const UPDATE_USERNAME = "UPDATE-USERNAME";
const UPDATE_PASSWORD = "UPDATE-PASSWORD";
const CHANGE_SIGNUP_STATUS = "CHANGE-SIGNUP-STATUS";

export const SIGNUP_STATUS_NONE = "SIGNUP-STATUS-NONE";
export const SIGNUP_STATUS_INCOMPLETE_DATA = "SIGNUP-STATUS-INCOMPLETE-DATA";
export const SIGNUP_STATUS_INVALID_DATA = "SIGNUP-STATUS-INVALID-DATA";
export const SIGNUP_STATUS_ALREADY_EXISTS = "SIGNUP-STATUS-ALREADY-EXIST"; 
export const SIGNUP_STATUS_SUCCESS = "SIGNUP-STATUS-SUCCESS";

const initialState = {
    usernameFieldValue: "",
    passwordFieldValue: "",
    signupStatus: SIGNUP_STATUS_NONE,
};

const signupReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USERNAME: {
            return {
                ...state,
                signupStatus: SIGNUP_STATUS_NONE,
                usernameFieldValue: action.username,
            }
        }

        case UPDATE_PASSWORD: {
            return {
                ...state,
                signupStatus: SIGNUP_STATUS_NONE,
                passwordFieldValue: action.password,
            }
        }

        case CHANGE_SIGNUP_STATUS: {
            const signupStatusVariants = [
                SIGNUP_STATUS_NONE,
                SIGNUP_STATUS_INCOMPLETE_DATA,
                SIGNUP_STATUS_INVALID_DATA,
                SIGNUP_STATUS_ALREADY_EXISTS,
                SIGNUP_STATUS_SUCCESS,
            ];
            
            if (!signupStatusVariants.includes(action.status)) {
                throw new Error(`Invalid status value: ${action.status}`);
            }

            return {
                ...state,
                signupStatus: action.status,
            }
        }
    
        default:
            return state;
    }
}

export const updateSignupUsername = username => ({type: UPDATE_USERNAME, username});
export const updateSignupPassword = password => ({type: UPDATE_PASSWORD, password});
export const changeSignupStatus = status => ({type: CHANGE_SIGNUP_STATUS, status});

export default signupReducer;