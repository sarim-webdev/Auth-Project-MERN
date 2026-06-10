import axios from "axios";

const API = axios.create({
  baseURL: "https://auth-project-mern-r5wa.vercel.app/api",
  withCredentials: true,
});

export default API;