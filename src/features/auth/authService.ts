import axios from "axios";

export interface UserData {
  username: string;
  email: string;
  password: string;
  posts: string[];
  followers: string[];
  following: string[];
}

// Register user
const register = async (userData: {
  username: string;
  email: string;
  password: string;
}) => {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_API_URL + "/auth/register",
    userData
  );

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (userData: { email: string; password: string }) => {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_API_URL + "/auth/login",
    userData
  );

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
