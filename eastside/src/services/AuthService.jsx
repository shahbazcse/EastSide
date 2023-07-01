import axios from "axios";

export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(`/api/auth/login`, loginData);
    return response.data;
  } catch (e) {
    console.log("Error: ", e);
  }
};
