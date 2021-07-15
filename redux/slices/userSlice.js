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
      const userData = response.data.getUser;
      // if a message is received, it means that something went wrong
      if (userData.message) {
        return { message: userData.message };
      }
      return removeNullsInObject(userData);
    } catch (error) {
      return { message: error.errors[0].message };
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
      const { message } = payload;

      // message means that it was unsuccessful
      if (message) {
        state.status = "failed";
        state.message = message;
        state.data = null;
      }
      state.data = payload;
      state.message = null;
      state.status = "succeeded";
    });

    builder.addCase(fetchUserFromDbById.rejected, (state, { payload }) => {
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
