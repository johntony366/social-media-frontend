import axios from "axios";
import { UserData } from "../auth/authService";

export interface PostData {
  _id: string;
  author: UserData;
  title: string;
  content: string;
  likes: String[];
}

const fetchUserPosts = async () => {
  const response = await axios.get("/api/posts");
  return response.data;
};

const createPost = async (data: any) => {
  const response = await axios.post("/api/posts", data);
  return response.data;
};

const deletePost = async (postId: string) => {
  const response = await axios.delete(`/api/posts/${postId}`);
  return response.data;
};

const updatePost = async (postId: string, data: any) => {
  const response = await axios.put(`/api/posts/${postId}`, data);
  return response.data;
};

const likePost = async (postId: string) => {
  const response = await axios.put(`/api/posts/${postId}/like`);
  return response.data;
};

const fetchFollowingPosts = async (page: number, pageSize: number) => {
  const response = await axios.get("/api/posts/following", {
    params: { page, pageSize },
  });
  return response.data;
};

const fetchExplorePosts = async (page: number, pageSize: number) => {
  const response = await axios.get("/api/posts/explore", {
    params: { page, pageSize },
  });
  return response.data;
};

const postService = {
  fetchUserPosts,
  createPost,
  deletePost,
  updatePost,
  likePost,
  fetchFollowingPosts,
  fetchExplorePosts,
};

export default postService;
