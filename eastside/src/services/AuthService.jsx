import axios from "axios";

export const loginUser = async (formData) => {
  const response = await axios.post(`/api/auth/login`, formData);
  return response.data;
};

export const signupUser = async (formData) => {
  const response = await axios.post("/api/auth/signup", formData);
  return response.data;
};
