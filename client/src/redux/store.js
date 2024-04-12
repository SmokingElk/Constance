import { configureStore } from "@reduxjs/toolkit";
import advertisementReducer from "./advertisementReducer";
import loginReducer from "./loginReducer";
import signupReducer from "./signupReducer";
import enteredReducer from "./enteredReducer";
import myProfileReducer from "./myProfileReducer";
import watchProfileReducer from "./watchProfileReducer";
import navbarReducer from "./navbarReducer";
import preferencesReducer from "./preferencesReducer";

let store = configureStore({
    reducer: {
        advertisement: advertisementReducer,
        login: loginReducer,
        signup: signupReducer,
        entered: enteredReducer,
        myProfile: myProfileReducer,
        watchProfile: watchProfileReducer,
        navbar: navbarReducer,
        preferences: preferencesReducer,
    }
}); 

export default store;