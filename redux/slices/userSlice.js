import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    changeUserSingleField: (state, { payload }) => {
      const { field, value } = payload;
      state.user[field] = value;
    },
    resetUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, changeUserSingleField, resetUser } = userSlice.actions;

export default userSlice.reducer;
