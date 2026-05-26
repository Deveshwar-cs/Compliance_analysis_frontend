import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:5003/api",
  baseURL: "https://compliance-analysis-backend.onrender.com",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    // ✅ If request is successful, just return response
    return response;
  },
  (error) => {
    // ❌ Handle errors here

    if (error.response) {
      // You can also show message from backend
      const message = error.response.data?.message || "Something went wrong";
      console.error(message);
    } else if (error.request) {
      // Request was made but no response received
      console.error("No response from server");
    } else {
      // Something else happened
      console.error("Error:", error.message);
    }

    // IMPORTANT: Always reject so calling code can handle it too
    return Promise.reject(error);
  },
);

export default api;
