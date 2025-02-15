import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development"
    ? "http://localhost:3000/api"
    : "https://chat-app-1-o1d5.onrender.com/api", // Replace with your Render URL
  withCredentials: true,
});
