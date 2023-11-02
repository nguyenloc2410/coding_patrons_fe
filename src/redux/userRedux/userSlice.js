import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentUser: {},
  loading: false,
  is_Authentic: false,
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
      state.is_Authentic = true;
    },
    logInFail: (state) => {
      state.loading = false;
      state.is_Authentic = false;
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
  },
});
export const {
  logInStart,
  logInSuccess,
  logInFail,
  updateStart,
  updateSuccess,
  updateFail,
} = userSlice.actions;
export default userSlice.reducer;
