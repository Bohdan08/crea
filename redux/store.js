import { configureStore } from "@reduxjs/toolkit";
import regionSlice from "./slices/regionSlice";

export default configureStore({
  reducer: {
    region: regionSlice,
  },
});
