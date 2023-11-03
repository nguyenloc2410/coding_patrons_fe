import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentUser: null,
  loading: false,
  googleAuth: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logInStart: (state) => {
      state.loading = true;
    },
    logInSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    logInGoogleSuccess: (state, action) => {
      state.googleAuth = true;
      state.loading = false;
      state.currentUser = action.payload;
    },
    logInFail: (state) => {
      state.loading = false;
      state.currentUser = null;
    },
    updateStart: (state) => {
      state.loading = true;
    },
    updateSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    updateFail: (state) => {
      state.loading = false;
    },
    logOutStart: (state) => {
      state.loading = true;
    },
    logOutSuccess: (state) => {
      state.loading = false;
      state.currentUser = null;
      state.googleAuth = false;
    },
    logOutFail: (state) => {
      state.loading = false;
    },
  },
});
export const {
  logInStart,
  logInSuccess,
  logInFail,
  updateStart,
  updateSuccess,
  updateFail,
  logOutStart,
  logOutSuccess,
  logOutFail,
  logInGoogleSuccess,
} = userSlice.actions;
export default userSlice.reducer;
