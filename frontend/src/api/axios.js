import axios from "axios";

const getBaseURL = () => {
  let url = import.meta.env.VITE_API_URL || "https://librarynode-backend.onrender.com/api";
  url = url.trim().replace(/\/+$/, "");
  if (!url.endsWith("/api")) {
    url += "/api";
  }
  return url;
};

const API = axios.create({
  baseURL: getBaseURL(),
});

export default API;