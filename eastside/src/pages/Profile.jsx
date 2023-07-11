import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import { Oval } from "react-loader-spinner";
import { toast } from "react-toastify";

export default function Profile() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { dispatch: AppDispatch } = useContext(AppContext);

  const {
    state: { user },
    dispatch,
  } = useContext(AuthContext);
  const { firstName, lastName, email } = user;

  const handleLogout = () => {
    setLoading(true);

    setTimeout(() => {
      localStorage.clear();
      dispatch({ type: "setToken", payload: null });
      dispatch({ type: "setUser", payload: null });
      AppDispatch({ type: "updateCart", payload: [] });
      AppDispatch({ type: "updateWishlist", payload: [] });
      navigate("/login");
      toast.success("Logout Successful", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center mt-6">
      <div
        className={`${
          loading ? "visible" : "invisible"
        } flex mx-auto items-center`}
      >
        <Oval
          height={80}
          width={80}
          color="#424242"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#cb997e"
          strokeWidth={3}
          strokeWidthSecondary={2}
        />
      </div>
      <div className="flex flex-col gap-4 m-auto mt-6 bg-slate-100 p-4 h-[16rem] w-[32rem] border border-slate-300">
        <div className="flex items-center justify-between gap-4">
          <h1 className="font-bold text-2xl my-3">Account</h1>
          <div
            onClick={() => navigate("/address")}
            className="bg-white hover:bg-slate-300 border-2 border-black px-4 py-1 rounded-lg cursor-pointer"
          >
            Manage Addresses
          </div>
        </div>
        <h2>
          Name: {firstName} {lastName}
        </h2>
        <h2>Email: {email}</h2>
        <div
          onClick={handleLogout}
          className="bg-red-400 hover:bg-red-600 font-bold text-center mx-auto mt-6 border-2 border-black px-4 py-1 rounded-lg cursor-pointer"
        >
          Logout
        </div>
      </div>
    </div>
  );
}
