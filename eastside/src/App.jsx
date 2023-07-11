import "./App.css";
import {
  Routes,
  Route,
  NavLink,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import WishList from "./pages/WishList";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import { useContext } from "react";
import { FilterContext } from "./contexts/FilterContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShirt,
  faHeartCirclePlus,
  faCartPlus,
  faHouse,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Mockman from "mockman-js";
import Signup from "./pages/Signup";
import RequireAuth from "./components/RequireAuth";
import { AuthContext } from "./contexts/AuthContext";
import AddressPage from "./pages/AddressPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const navigate = useNavigate();

  const {
    state: { token },
  } = useContext(AuthContext);

  const { state, dispatch } = useContext(FilterContext);

  // Revamp CSS for V2.0

  return (
    <div className="App">
      <ToastContainer autoClose={2000} theme="dark" />
      <header>
        <nav>
          <NavLink to="/">
            <div className="logo">
              <FontAwesomeIcon icon={faHouse} />
            </div>
          </NavLink>
          <form className="search-input">
            <input
              value={state.query}
              onChange={(e) => {
                navigate("/products");
                dispatch({ type: "setQuery", payload: e.target.value });
              }}
              placeholder="Search Products"
              type="text"
            />
          </form>

          <ul className="nav-links">
            <li className="list">
              <NavLink to="/products">
                <FontAwesomeIcon icon={faShirt} />
              </NavLink>
            </li>

            <li className="list">
              <NavLink to="/wishlist">
                <FontAwesomeIcon icon={faHeartCirclePlus} />
              </NavLink>
            </li>

            <li className="list">
              <NavLink to="/cart">
                <FontAwesomeIcon icon={faCartPlus} />
              </NavLink>
            </li>

            {token ? (
              <li className="list">
                <NavLink to="/profile">
                  <FontAwesomeIcon icon={faUser} />
                </NavLink>
              </li>
            ) : (
              <li className="list">
                <NavLink to="/login">
                  <FontAwesomeIcon icon={faUser} />
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route
          path="/products/product/:productId"
          element={<ProductDetails />}
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          path="/address"
          element={
            <RequireAuth>
              <AddressPage />
            </RequireAuth>
          }
        />
        <Route
          path="/wishlist"
          element={
            <RequireAuth>
              <WishList />
            </RequireAuth>
          }
        />
        <Route
          path="/cart"
          element={
            <RequireAuth>
              <Cart />
            </RequireAuth>
          }
        />
        <Route
          path="/checkout"
          element={
            <RequireAuth>
              <Checkout />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mockman" element={<Mockman />} />
      </Routes>
    </div>
  );
}

export default App;
