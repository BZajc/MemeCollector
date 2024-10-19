import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"
import navigationReducer from "./slices/navigationSlice"
import clickerReducer from "./slices/clickerSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        navigation: navigationReducer,
        clicker: clickerReducer
    }
})