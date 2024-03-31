import { configureStore } from "@reduxjs/toolkit";
import advertisementReducer from "./advertisementReducer";
import loginReducer from "./loginReducer";
import signupReducer from "./signupReducer";

let store = configureStore({
    reducer: {
        advertisement: advertisementReducer,
        login: loginReducer,
        signup: signupReducer,
    }
}); 

export default store;