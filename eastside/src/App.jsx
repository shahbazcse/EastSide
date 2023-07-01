import "./App.css";
import { Routes, Route, NavLink } from "react-router-dom";
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
import { AuthContext } from "./contexts/AuthContext";
import Signup from "./pages/Signup";

function App() {
  const {
    state: { token },
  } = useContext(AuthContext);
  const { state, dispatch } = useContext(FilterContext);

  return (
    <div className="App">
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
              onChange={(e) =>
                dispatch({ type: "setQuery", payload: e.target.value })
              }
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
        <Route path="/profile" element={<Profile />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mockman" element={<Mockman />} />
      </Routes>
    </div>
  );
}

export default App;
