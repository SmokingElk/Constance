const SET_PROFILE_DATA = "SET-PROFILE-DATA";
const SET_FETCHING = "SET-FETCHING";

/*
Редьюсер для управления состоянием экрана просмотра профиля произвольного пользователя.
 */
 
const initialState = {
    demo: false, 

    profileData: {
        username: "",
        firstname: "",
        lastname: "",
        social: "",
        phone: "",
        about_me: "",
        location: "",
        birthdate: "",
        photoName: "placeholder",
    },

    isFetching: false,
};

const watchProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROFILE_DATA: {
            return {
                ...state,
                profileData: {
                    ...state.profileData,
                    ...action.profileData,
                }
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
};

export const setWatchProfileData = profileData => ({type: SET_PROFILE_DATA, profileData});
export const setWatchProfileFetching = value => ({type: SET_FETCHING, value});

export default watchProfileReducer;