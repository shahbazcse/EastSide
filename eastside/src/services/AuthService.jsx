import axios from "axios";

export const loginUser = async (formData) => {
  const response = await axios.post(`/api/auth/login`, formData);
  localStorage.setItem(
    "session",
    JSON.stringify({
      user: response.data.foundUser,
      encodedToken: response.data.encodedToken,
    })
  );
  return response.data;
};

export const signupUser = async (formData) => {
  const response = await axios.post("/api/auth/signup", formData);
  localStorage.setItem(
    "session",
    JSON.stringify({
      user: response.data.createdUser,
      encodedToken: response.data.encodedToken,
    })
  );
  return response.data;
};
