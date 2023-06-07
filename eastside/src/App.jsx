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
  faMagnifyingGlass,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";

function App() {
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
            <button>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </form>

          <ul className="nav-links">
            <li className="list">
              <NavLink to="/products">
                <FontAwesomeIcon icon={faShirt} />
              </NavLink>
            </li>

            {/* <li className="list">
              <NavLink to="/profile">
          Profile
        </NavLink>
            </li> */}

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

            {/* <li className="list">
              <NavLink to="/login">
          Login
        </NavLink>
            </li> */}
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
      </Routes>
    </div>
  );
}

export default App;
