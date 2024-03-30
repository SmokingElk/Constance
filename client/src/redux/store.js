import { configureStore } from "@reduxjs/toolkit";
import advertisementReducer from "./advertisementReducer";
import authReducer from "./authReducer";

let store = configureStore({
    reducer: {
        advertisement: advertisementReducer,
        auth: authReducer,
    }
}); 

export default store;