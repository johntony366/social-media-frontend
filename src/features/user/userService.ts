import axios from "axios";
import { UserData } from "../auth/authService";

const fetchUser = async () => {
  const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/user");
  return response.data;
};

const updateUser = async (data: UserData) => {
  const response = await axios.put(
    process.env.NEXT_PUBLIC_API_URL + "/user",
    data
  );
  return response.data;
};

const deleteUser = async () => {
  const response = await axios.delete(
    process.env.NEXT_PUBLIC_API_URL + "/user"
  );
  return response.data;
};

const followUser = async (userId: string) => {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_API_URL + `/user/${userId}/follow`
  );
  return response.data;
};

const unfollowUser = async (userId: string) => {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_API_URL + `/user/${userId}/unfollow`
  );
  return response.data;
};

const userService = {
  fetchUser,
  updateUser,
  deleteUser,
  followUser,
  unfollowUser,
};

export default userService;
