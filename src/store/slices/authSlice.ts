import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  showRegistration: boolean;
  swapFormAnimation: boolean;

}

const initialState: AuthState = {
  showRegistration: false,
  swapFormAnimation: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setShowRegistration: (state, action: PayloadAction<boolean>) => {
      state.showRegistration = action.payload;
    },
    setSwapFormAnimation: (state, action: PayloadAction<boolean>) => {
      state.swapFormAnimation = action.payload;
    }
  },
});

export default authSlice.reducer;
export const { setShowRegistration, setSwapFormAnimation } =
  authSlice.actions;
export const selectShowRegistration = (state: { auth: AuthState }) =>
  state.auth.showRegistration;
export const selectSwapFormAnimation = (state: { auth: AuthState }) =>
  state.auth.swapFormAnimation;