import "./App.css";
import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import WishList from "./pages/WishList";
import Cart from "./pages/Cart";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      <div>
        <NavLink to="/products">Products</NavLink>
        <span> </span>
        <NavLink to="/profile">Profile</NavLink>
        <span> </span>
        <NavLink to="/wishlist">Wishlist</NavLink>
        <span> </span>
        <NavLink to="/cart">Cart</NavLink>
        <span> </span>
        <NavLink to="/login">Login</NavLink>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
