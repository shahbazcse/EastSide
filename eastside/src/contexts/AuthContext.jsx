import { createContext, useEffect, useReducer } from "react";
import { loginUser } from "../services/AuthService";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const initialState = {
    token: null,
    user: null,
  };

  const reducerFn = (state, action) => {
    switch (action.type) {
      case "setToken":
        return {
          ...state,
          token: action.payload,
        };
      case "setUser":
        return {
          ...state,
          user: action.payload,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducerFn, initialState);

  const getUserDetails = async () => {
    const loginData = {
      email: "cseshahbaz@gmail.com",
      password: "shahbaz123",
    };
    const response = await loginUser(loginData);
    dispatch({ type: "setToken", payload: response.encodedToken });
    dispatch({ type: "setUser", payload: response.foundUser });
  };

  useEffect(() => {
    if (!initialState.token) {
      getUserDetails();
    }
  });

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
