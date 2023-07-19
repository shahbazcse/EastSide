import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import { AuthContext } from "../contexts/AuthContext";
import {
  addToWishlist,
  deleteFromCart,
  deleteFromWishlist,
  updateQuantity,
} from "../services/UserService";

export default function CartItemsCard({ ...prod }) {
  const { _id, title, price, qty, image, rating } = prod;

  const cartPage = window.location.pathname === "/cart";
  const wishlistPage = window.location.pathname === "/wishlist";

  const {
    state: { cart, wishlist },
    dispatch,
  } = useContext(AppContext);

  const {
    state: { token },
  } = useContext(AuthContext);

  const handleRemoveCart = async () => {
    const cart = await deleteFromCart(token, _id);
    dispatch({ type: "updateCart", payload: cart });
  };

  const handleAddWishlist = async () => {
    if (token) {
      const wishlist = await addToWishlist(token, prod);
      dispatch({ type: "updateWishlist", payload: wishlist });
    }
  };

  const handleRemoveWishlist = async () => {
    const wishlist = await deleteFromWishlist(token, _id);
    dispatch({ type: "updateWishlist", payload: wishlist });
  };

  const handleUpdateQuantity = async (type) => {
    const cart = await updateQuantity(token, type, _id);
    dispatch({ type: "updateCart", payload: cart });
  };

  const inCart = cart.find(({ _id }) => _id === prod._id);
  const inWishlist = wishlist.find(({ _id }) => _id === prod._id);

  return (
    <div className="cart-product-card" key={_id}>
      <div className="cart-product__details">
        <div className="cart-product__image">
          <img src={image} alt="product" />
        </div>
        <div className="cart-product__info">
          <div className="product-detail__info-header">
            <h4 className="product-detail__info-header_name">{title}</h4>
            <span className="product-detail__info-header-rating">
              {rating.rate.toFixed(1)}
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22Z"
                  ></path>
                </svg>
              </div>
            </span>
          </div>
          <div className="product-detail__info-price">
            <div className="product-detail__info-price-main">
              <p className="product-detail__info-price__final">
                Price: ₹{price}
              </p>
            </div>
          </div>

          <div className="cart-product__qty">
            {cartPage && (
              <>
                <button
                  disabled={qty === 1}
                  className="cart-product__qty-btn"
                  onClick={() => handleUpdateQuantity("decrement")}
                >
                  -
                </button>
                <span className="cart-product__qty-value">{qty}</span>
                <button
                  className="cart-product__qty-btn"
                  onClick={() => handleUpdateQuantity("increment")}
                >
                  +
                </button>
              </>
            )}
          </div>

          <div className="cart-product__btn-group">
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
                <button
                  className="product-card__btn"
                  onClick={() => dispatch({ type: "addToCart", payload: prod })}
                >
                  Add To Cart
                </button>
              ) : !wishlistPage ? (
                <button className="product-card__btn in-cart-btn">
                  <Link
                    to="/cart"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Go to Cart
                  </Link>
                </button>
              ) : (
                <button
                  className="product-card__btn in-cart-btn"
                  onClick={() =>
                    dispatch({ type: "increaseQuantity", payload: _id })
                  }
                >
                  Add again
                </button>
              )
            ) : (
              <button className="product-card__btn" onClick={handleRemoveCart}>
                Remove
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
