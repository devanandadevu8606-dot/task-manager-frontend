import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 
           (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
             ? "http://localhost:5000/api"
             : "https://task-manager-backend-oj2f.onrender.com/api"),
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Handle expired or invalid token redirects (excluding login/register to prevent loops)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && error.config && !error.config.url.includes("/auth/login") && !error.config.url.includes("/auth/register")) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;