import { configureStore } from "@reduxjs/toolkit";
import regionSlice from "./slices/regionSlice";
import userSlice from "./slices/userSlice";

export default configureStore({
  reducer: {
    region: regionSlice,
    user: userSlice,
  },
});
