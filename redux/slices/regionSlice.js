import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentRegion: null,
};

export const regionSlice = createSlice({
  name: "region",
  initialState,
  reducers: {
    setRegion: (state, { payload }) => {
      state.currentRegion = payload;
    },
  },
});

export const { setRegion } = regionSlice.actions;

export default regionSlice.reducer;
