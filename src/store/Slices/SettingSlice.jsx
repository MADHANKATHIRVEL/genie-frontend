import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  settings: {
    collapsed: false,
  },
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setCollapse: (state, action) => {
      state.settings.collapsed = action.payload;
    },
  },
});

export const { setCollapse } = settingsSlice.actions;

export default settingsSlice.reducer;
