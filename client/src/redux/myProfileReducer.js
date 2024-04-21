const initialState = {
    demo: false,
    
    firstnameFieldValue: "",
    lastnameFieldValue: "",
    socialFieldValue: "",
    phoneNumberFieldValue: "",
    aboutMeNumberFieldValue: "",
    locationFieldValue: "",
    photoName: "placeholder",
};

const UPDATE_FIRSTNAME = "UPDATE-FIRSTNAME";
const UPDATE_LASTNAME = "UPDATE-LASTNAME";
const UPDATE_SOCIAL = "UPDATE-SOCIAL";
const UPDATE_PHONE = "UPDATE-PHONE";
const UPDATE_ABOUT_ME = "UPDATE-ABOUT-ME";
const UPDATE_LOCATION = "UPDATE-LOCATION"; 
const UPDATE_PHOTO = "UPDATE-PHOTO";

const myProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_FIRSTNAME: {
            return {
                ...state,
                firstnameFieldValue: action.fieldValue,
            }
        }

        case UPDATE_LASTNAME: {
            return {
                ...state,
                lastnameFieldValue: action.fieldValue,
            }
        }

        case UPDATE_SOCIAL: {
            return {
                ...state,
                socialFieldValue: action.fieldValue,
            }
        }

        case UPDATE_PHONE: {
            return {
                ...state,
                phoneNumberFieldValue: action.fieldValue,
            }
        }

        case UPDATE_ABOUT_ME: {
            return {
                ...state,
                aboutMeNumberFieldValue: action.fieldValue,
            }
        }

        case UPDATE_LOCATION: {
            return {
                ...state,
                locationFieldValue: action.fieldValue,
            }
        }

        case UPDATE_PHOTO: {
            return {
                ...state,
                photoName: action.photoName,
            }
        }
    
        default:
            return state;
    }
}

export const updateMyProfileFirstname = fieldValue => ({type: UPDATE_FIRSTNAME, fieldValue});
export const updateMyProfileLastname = fieldValue => ({type: UPDATE_LASTNAME, fieldValue});
export const updateMyProfileSocial = fieldValue => ({type: UPDATE_SOCIAL, fieldValue});
export const updateMyProfilePhone = fieldValue => ({type: UPDATE_PHONE, fieldValue});
export const updateMyProfileAboutMe = fieldValue => ({type: UPDATE_ABOUT_ME, fieldValue});
export const updateMyProfileLocation = fieldValue => ({type: UPDATE_LOCATION, fieldValue});
export const updateMyProfilePhoto = photoName => ({type: UPDATE_PHOTO, photoName});

export default myProfileReducer;