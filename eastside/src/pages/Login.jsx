import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../services/AuthService";
import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });

  const { dispatch } = useContext(AuthContext);

  const handleLogin = async () => {
    const response = await loginUser(formData);
    dispatch({ type: "setToken", payload: response.encodedToken });
    dispatch({ type: "setUser", payload: response.foundUser });
    navigate(location?.state?.from?.pathname || "/");
  };

  const handleGuestLogin = async () => {
    const response = await loginUser({
      email: "cseshahbaz@gmail.com",
      password: "shahbaz123",
    });
    dispatch({ type: "setToken", payload: response.encodedToken });
    dispatch({ type: "setUser", payload: response.foundUser });
    navigate(location?.state?.from?.pathname || "/");
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 m-auto mt-36 bg-slate-100 p-4 h-[28rem] w-[24rem] border border-slate-300">
      <h1 className="font-bold text-2xl mb-3">Login</h1>
      <input
        type="text"
        placeholder="Enter Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="p-2 border-black border"
      />
      <input
        type="password"
        placeholder="Enter Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        className="p-2 border-black border"
      />
      <div
        onClick={handleLogin}
        className="bg-white hover:bg-slate-300 border-2 border-black mt-3 px-4 py-1 rounded-lg cursor-pointer"
      >
        Login
      </div>
      <div
        onClick={handleGuestLogin}
        className="bg-white hover:bg-slate-300 border-2 border-black px-4 py-1 rounded-lg cursor-pointer"
      >
        Guest Login
      </div>
      <div
        onClick={() => navigate("/signup")}
        className="font-semibold text-slate-600 hover:text-black mt-3 cursor-pointer"
      >
        Create New Account
      </div>
    </div>
  );
}
