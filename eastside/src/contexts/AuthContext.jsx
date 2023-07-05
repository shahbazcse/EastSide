import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const session = JSON.parse(localStorage.getItem("session"));

  const initialState = {
    token: session?.encodedToken,
    user: session?.user,
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

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
