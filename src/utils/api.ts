import axios from "axios";

const api = axios.create({
  baseURL: "https://chess-app.fly.dev",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
