import axios from "axios";

const API_BASE_URL = "https://starist.onrender.com/api/v1"

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  export const createUser = async (userData) => {
    try {
      const response = await api.post("/user", userData);
      return response.data; // Return the created user data
    } catch (error) {
      console.error("Error creating user:", error);
      throw error; // Rethrow error to handle it in the calling function
    }
  };