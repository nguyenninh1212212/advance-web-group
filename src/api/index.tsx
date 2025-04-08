import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "/api", // URL của server
  timeout: 5000, // Timeout sau 5 giây
  headers: {
    "Content-Type": "application/json",
  },
});

const token = Cookies.get("token");

export { token, api };
