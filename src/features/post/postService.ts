import axios from "axios";
import { UserData } from "../auth/authService";

export interface PostData {
  _id: string;
  author: UserData;
  title: string;
  content: string;
  likes: String[];
}

const fetchUserPosts = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(
    process.env.NEXT_PUBLIC_API_URL + "/post",
    config
  );
  return response.data;
};

const createPost = async (data: any) => {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_API_URL + "/post",
    data
  );
  return response.data;
};

const deletePost = async (postId: string) => {
  const response = await axios.delete(
    process.env.NEXT_PUBLIC_API_URL + `/post/${postId}`
  );
  return response.data;
};

const updatePost = async (postId: string, data: any) => {
  const response = await axios.put(
    process.env.NEXT_PUBLIC_API_URL + `/post/${postId}`,
    data
  );
  return response.data;
};

const likePost = async (postId: string) => {
  const response = await axios.put(
    process.env.NEXT_PUBLIC_API_URL + `/post/${postId}/like`
  );
  return response.data;
};

const fetchFollowingPosts = async (page: number, pageSize: number) => {
  const response = await axios.get(
    process.env.NEXT_PUBLIC_API_URL + "/post/following",
    {
      params: { page, pageSize },
    }
  );
  return response.data;
};

const fetchExplorePosts = async (
  page: number,
  pageSize: number,
  token: string
) => {
  const response = await axios.get(
    process.env.NEXT_PUBLIC_API_URL + "/post/explore",
    {
      params: { page, pageSize },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log("Response is: " + response.data);

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
