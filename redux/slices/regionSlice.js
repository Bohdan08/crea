import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const regionSlice = createSlice({
  name: "region",
  initialState,
  reducers: {
    setRegion: (state, { payload }) => {
      state.value = payload;
    },
  },
});

export const { setRegion } = regionSlice.actions;

export default regionSlice.reducer;
