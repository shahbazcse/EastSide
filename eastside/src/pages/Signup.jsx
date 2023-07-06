import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../services/AuthService";
import { AuthContext } from "../contexts/AuthContext";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { dispatch } = useContext(AuthContext);

  const handleSignup = async () => {
    const response = await signupUser(formData);
    dispatch({ type: "setToken", payload: response.encodedToken });
    dispatch({ type: "setUser", payload: response.createdUser });
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 m-auto mt-36 bg-slate-100 p-4 h-[34rem] w-[24rem] border border-slate-300">
      <h1 className="font-bold text-2xl mb-3">Sign Up</h1>
      <input
        type="text"
        placeholder="First Name"
        value={formData.firstName}
        onChange={(e) =>
          setFormData({ ...formData, firstName: e.target.value })
        }
        className="p-2 border-black border"
      />
      <input
        type="text"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
        className="p-2 border-black border"
      />
      <input
        type="text"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="p-2 border-black border"
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        className="p-2 border-black border"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={(e) =>
          setFormData({ ...formData, confirmPassword: e.target.value })
        }
        className="p-2 border-black border"
      />
      <div
        onClick={handleSignup}
        className="bg-white hover:bg-slate-300 border-2 border-black mt-3 px-4 py-1 rounded-lg cursor-pointer"
      >
        Sign Up
      </div>
      <div
        onClick={() => navigate("/login")}
        className="font-semibold text-slate-600 hover:text-black mt-3 cursor-pointer"
      >
        Already have an account? Log in
      </div>
    </div>
  );
}
