import axios from "axios";

const getBaseUrl = () => {
  const envUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
  return envUrl.replace(/\/+$/, "");
};

const api = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  // Normalize URL to handle both '/api/endpoint' and '/endpoint' transparently
  if (config.url?.startsWith("/api/")) {
    config.url = config.url.substring(4); // Remove leading '/api'
  }

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If auth token is invalid, expired, or user was deleted after re-seeding
    if (error.response && (error.response.status === 401 || (error.response.status === 404 && error.config?.url?.includes('/auth/me')))) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
