const SET_PROFILE_DATA = "SET-PROFILE-DATA";

const initialState = {
    profileData: {
        firstname: "",
        lastname: "",
        social: "",
        phone: "",
        birthdate: "",
        photoName: "placeholder",
    }
};

const watchProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROFILE_DATA: {
            return {
                ...state,
                profileData: action.profileData,
            }
        }

        default:
            return state;
    }
};

export const setWatchProfileData = profileData => ({type: SET_PROFILE_DATA, profileData});

export default watchProfileReducer;