import axios from "axios";
import { UserData } from "../auth/authService";

export interface PostData {
  _id: string;
  author: UserData;
  title: string;
  content: string;
  likes: String[];
}

const fetchUserPosts = async (
  page: number,
  pageSize: number,
  token: string
) => {
  const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/post", {
    params: { page, pageSize },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const createPost = async (data: any, token: string) => {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_API_URL + "/post",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const deletePost = async (postId: string, token: string) => {
  const response = await axios.delete(
    process.env.NEXT_PUBLIC_API_URL + `/post/${postId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const updatePost = async (postId: string, data: any, token: string) => {
  const response = await axios.put(
    process.env.NEXT_PUBLIC_API_URL + `/post/${postId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const likePost = async (postId: string, token: string) => {
  const response = await axios.put(
    process.env.NEXT_PUBLIC_API_URL + `/post/${postId}/like`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const fetchFollowingPosts = async (
  page: number,
  pageSize: number,
  token: String
) => {
  const response = await axios.get(
    process.env.NEXT_PUBLIC_API_URL + "/post/following",
    {
      params: { page, pageSize },
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
