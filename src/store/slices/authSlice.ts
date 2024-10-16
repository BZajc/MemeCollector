import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    showRegistration: boolean;
}

const initialState: AuthState = {
    showRegistration: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setShowRegistration: (state, action: PayloadAction<boolean>) => {
            state.showRegistration = action.payload
            console.log("setShowRegistration:", action.payload);
        }
    }
})

export const { setShowRegistration } = authSlice.actions
export default authSlice.reducer
export const selectSetShowRegistration = (state: {auth: AuthState}) => state.auth.showRegistration