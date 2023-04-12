import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService, { PostData } from "./postService";

const initialState: {
  userPosts: PostData[];
  followingPosts: PostData[];
  explorePosts: PostData[];
  status: string;
  error: any;
} = {
  userPosts: [],
  followingPosts: [],
  explorePosts: [],
  status: "idle",
  error: null,
};

export const fetchUserPosts = createAsyncThunk(
  "posts/fetchUserPosts",
  async ({}, thunkAPI: any) => {
    const token = thunkAPI.getState().auth.user.token;
    const response = await postService.fetchUserPosts(token);
    return response;
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (data: any, thunkAPI: any) => {
    const token = thunkAPI.getState().auth.user.token;
    const response = await postService.createPost(data, token);
    return response;
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId: string, thunkAPI: any) => {
    const token = thunkAPI.getState().auth.user.token;
    const response = await postService.deletePost(postId, token);
    return response;
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ postId, data }: { postId: string; data: any }, thunkAPI: any) => {
    const token = thunkAPI.getState().auth.user.token;
    const response = await postService.updatePost(postId, data, token);
    return response;
  }
);

export const likePost = createAsyncThunk(
  "posts/likePost",
  async (postId: string, thunkAPI: any) => {
    const token = thunkAPI.getState().auth.user.token;
    const response = await postService.likePost(postId, token);
    return response;
  }
);

export const fetchFollowingPosts = createAsyncThunk(
  "posts/fetchFollowingPosts",
  async (
    { page, pageSize }: { page: number; pageSize: number },
    thunkAPI: any
  ) => {
    const token = thunkAPI.getState().auth.user.token;
    const response = await postService.fetchFollowingPosts(
      page,
      pageSize,
      token
    );
    return response;
  }
);

export const fetchExplorePosts = createAsyncThunk(
  "posts/fetchExplorePosts",
  async (
    { page, pageSize }: { page: number; pageSize: number },
    thunkAPI: any
  ) => {
    const token = thunkAPI.getState().auth.user.token;
    const response = await postService.fetchExplorePosts(page, pageSize, token);
    return response;
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userPosts = action.payload;
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userPosts.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userPosts = state.userPosts.filter(
          (post) => post._id !== action.payload._id
        );
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userPosts = state.userPosts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userPosts = state.userPosts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
        state.followingPosts = state.followingPosts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
        state.explorePosts = state.explorePosts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
      })
      .addCase(likePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchFollowingPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFollowingPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.followingPosts = action.payload.posts;
      })
      .addCase(fetchFollowingPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchExplorePosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchExplorePosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.explorePosts = action.payload.posts;
      })
      .addCase(fetchExplorePosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default postSlice.reducer;
