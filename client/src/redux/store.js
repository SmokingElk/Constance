import { configureStore } from "@reduxjs/toolkit";
import advertisementReducer from "./advertisementReducer";

let store = configureStore({
    reducer: {
        advertisement: advertisementReducer,
    }
}); 

export default store;