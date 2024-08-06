import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
  },
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userlogin: (state, action) => {
      state.user = action.payload;
    },
    userLogout: (state, action) => {
      state.user = initialState.user;
    },
  },
});

export const { userlogin, userLogout } = UserSlice.actions;

export default UserSlice.reducer;
