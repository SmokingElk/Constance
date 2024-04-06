const SET_PROFILE_DATA = "SET-PROFILE-DATA";

const initialState = {
    demo: true, 

    profileData: {
        firstname: "1",
        lastname: "2",
        social: "3",
        phone: "4",
        birthdate: "5",
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