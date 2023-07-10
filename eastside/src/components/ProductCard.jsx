import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { addToWishlist, deleteFromWishlist } from "../services/UserService";

export default function ProductCard({ ...prod }) {
  const { _id, title, price, category, image, rating, units, inCart } = prod;

  const navigate = useNavigate();
  const cartPage = window.location.pathname === "/cart";
  const wishlistPage = window.location.pathname === "/wishlist";

  const {
    state: { token },
  } = useContext(AuthContext);

  const {
    state: { wishlist },
    dispatch,
  } = useContext(AppContext);

  const addToCart = () => {
    token ? dispatch({ type: "addToCart", payload: prod }) : navigate("/login");
  };

  const handleAddWishlist = async () => {
    if (token) {
      const wishlist = await addToWishlist(token, prod);
      dispatch({ type: "updateWishlist", payload: wishlist });
    } else {
      navigate("/login");
    }
  };

  const handleRemoveWishlist = async () => {
    const wishlist = await deleteFromWishlist(token, _id);
    dispatch({ type: "updateWishlist", payload: wishlist });
  };

  const inWishlist = wishlist.find(({ _id }) => _id === prod._id);

  return (
    <div key={_id} className="product-card">
      <div
        className="product-card__image"
        onClick={() => navigate(`/products/product/${_id}`)}
      >
        <img src={image} alt="Sample" />
      </div>
      <div className="product-card__details">
        <div
          className="product-card__details-title"
          onClick={() => navigate(`/products/product/${_id}`)}
        >
          <strong>
            <p>{title}</p>
          </strong>
        </div>
        <p>
          <strong>Price:</strong> Rs.{price}
        </p>
        <p>
          <strong>Available In Stock:</strong> {rating?.count}
        </p>
        <p>
          <strong>Category:</strong> {category}
        </p>
      </div>
      {cartPage && (
        <span>
          <button
            onClick={() => dispatch({ type: "decreaseQuantity", payload: _id })}
          >
            -
          </button>
          <span> {units} </span>
          <button
            onClick={() => dispatch({ type: "increaseQuantity", payload: _id })}
          >
            +
          </button>
        </span>
      )}
      <button
        className="product-card__btn `"
        onClick={() =>
          !inWishlist ? handleAddWishlist() : handleRemoveWishlist()
        }
      >
        {!inWishlist ? "Add to Wishlist" : "Remove from wishlist"}
      </button>
      {!cartPage ? (
        !inCart ? (
          <button className="product-card__btn" onClick={addToCart}>
            Add To Cart
          </button>
        ) : !wishlistPage ? (
          <button className="product-card__btn in-cart-btn">
            <Link to="/cart" style={{ textDecoration: "none", color: "black" }}>
              Go to Cart
            </Link>
          </button>
        ) : (
          <button
            className="product-card__btn in-cart-btn"
            onClick={() => dispatch({ type: "increaseQuantity", payload: _id })}
          >
            Add again
          </button>
        )
      ) : (
        <button
          className="product-card__btn"
          onClick={() => dispatch({ type: "removeFromCart", payload: prod })}
        >
          Remove From Cart
        </button>
      )}
    </div>
  );
}
