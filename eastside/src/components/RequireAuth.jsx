import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children }) {
  const {
    state: { token },
  } = useContext(AuthContext);

  const location = useLocation();

  return token ? children : <Navigate to="/login" state={{ from: location }} />;
}
