import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./Slices/UserSlice";
import settingsSlice from "./Slices/SettingSlice";

export default configureStore({
  reducer: {
    user: UserSlice,
    settings: settingsSlice,
  },
});
