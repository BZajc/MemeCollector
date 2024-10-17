import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  showRegistration: boolean;
  rotateFormAnimation: boolean;

}

const initialState: AuthState = {
  showRegistration: false,
  rotateFormAnimation: false,

};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setShowRegistration: (state, action: PayloadAction<boolean>) => {
      state.showRegistration = action.payload;
    },
    setRotateFormAnimation: (state, action: PayloadAction<boolean>) => {
      state.rotateFormAnimation = action.payload;
    }
  },
});

export const { setShowRegistration, setRotateFormAnimation } =
  authSlice.actions;
export default authSlice.reducer;
export const selectShowRegistration = (state: { auth: AuthState }) =>
  state.auth.showRegistration;
export const selectRotateFormAnimation = (state: { auth: AuthState }) =>
  state.auth.rotateFormAnimation;