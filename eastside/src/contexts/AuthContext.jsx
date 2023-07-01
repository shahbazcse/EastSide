import { createContext, useEffect, useReducer } from "react";

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

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
