import { configureStore } from "@reduxjs/toolkit";
import advertisementReducer from "./advertisementReducer";
import loginReducer from "./loginReducer";
import signupReducer from "./signupReducer";
import enteredReducer from "./enteredReducer";
import myProfileReducer from "./myProfileReducer";

let store = configureStore({
    reducer: {
        advertisement: advertisementReducer,
        login: loginReducer,
        signup: signupReducer,
        entered: enteredReducer,
        myProfile: myProfileReducer,
    }
}); 

export default store;