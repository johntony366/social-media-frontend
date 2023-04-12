import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";
import { UserData } from "../auth/authService";

const initialState: { user: UserData | null; status: string; error: any } = {
  user: null,
  status: "idle",
  error: null,
};

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const response = await userService.fetchUser();
  return response;
});

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (data: any) => {
    const response = await userService.updateUser(data);
    return response;
  }
);

export const deleteUser = createAsyncThunk("user/deleteUser", async () => {
  const response = await userService.deleteUser();
  return response;
});

export const followUser = createAsyncThunk(
  "user/followUser",
  async (userId: any, thunkAPI: any) => {
    const token = thunkAPI.getState().auth.user.token;
    const response = await userService.followUser(userId, token);
    return response;
  }
);

export const unfollowUser = createAsyncThunk(
  "user/unfollowUser",
  async (userId: any, thunkAPI: any) => {
    const token = thunkAPI.getState().auth.user.token;
    const response = await userService.unfollowUser(userId, token);
    return response;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = null;
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(unfollowUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      });
  },
});

export default userSlice.reducer;
