import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { removeNullsInObject } from "../../shared/utils";
import { getUser, listUsers } from "../../src/graphql/queries";

const initialState = {
  status: "idle",
  data: null,
  message: null,
};

export const fetchUserFromDbById = createAsyncThunk(
  "user/fetchUserById",
  async (userId, thunkAPI) => {
    try {
      const response = await API.graphql(
        graphqlOperation(getUser, { id: userId })
      );
      return removeNullsInObject(response.data.getUser);
    } catch (err) {
      return err;
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.data = payload;
    },
    changeUserSingleField: (state, { payload }) => {
      console.log(payload, "payload");
      const { field, value } = payload;
      state.data[field] = value;
    },
    resetUser: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserFromDbById.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(fetchUserFromDbById.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.status = "succeeded";
    });

    builder.addCase(fetchUserFromDbById.rejected, (state, { payload }) => {
      console.log(payload, "FAILED");
      state.status = "failed";
      state.message = payload;
    });
  },
});

export const {
  setUser,
  changeUserSingleField,
  resetUser,
  // fetchUserFromDb,
  // fetchUserFromDbById,
} = userSlice.actions;

export default userSlice.reducer;
