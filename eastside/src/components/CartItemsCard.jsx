import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { Link } from "react-router-dom";

export default function CartItemsCard({ ...prod }) {
  const {
    id,
    title,
    price,
    image,
    rating,
    units,
    inWishlist,
    inCart,
  } = prod;

  const cartPage = window.location.pathname === "/cart";
  const wishlistPage = window.location.pathname === "/wishlist";

  const { dispatch } = useContext(AppContext);

  return (
    <div className="cart-product-card" key={id}>
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
              <p className="product-detail__info-price__final">Price: ₹{price}</p>
            </div>
          </div>

          <div className="cart-product__qty">
            {/* <button
              className="cart-product__qty-btn"
              disabled={units === 1 || btnDisabled}
              onClick={() =>
                updateQtyInCartHandler(id, "DECREMENT", qty)
              }
            >
              -
            </button>
            <span className="cart-product__qty-value">{units}</span>
            <button
              className="cart-product__qty-btn"
              disabled={btnDisabled}
              onClick={() => updateQtyInCartHandler(id, "INCREMENT")}
            >
              +
            </button> */}
            {cartPage && (
              <>
                <button
                  className="cart-product__qty-btn"
                  onClick={() =>
                    dispatch({ type: "decreaseQuantity", payload: id })
                  }
                >
                  -
                </button>
                <span className="cart-product__qty-value">{units}</span>
                <button
                  className="cart-product__qty-btn"
                  onClick={() =>
                    dispatch({ type: "increaseQuantity", payload: id })
                  }
                >
                  +
                </button>
              </>
            )}
          </div>

          <div className="cart-product__btn-group">
            {/* <button
              className="cart-product__btn remove-btn"
              onClick={() => removeFromCartHandler(productId)}
              disabled={btnDisabled}
            >
              Remove
            </button>
            <button
              className={`cart-product__btn ${
                !inWishlist ? "add-btn" : "disabled-btn"
              }`}
              onClick={() => addToWishlistHandler(product)}
              disabled={inWishlist || btnDisabled}
            >
              {inWishlist ? "Already in Wishlist" : "Add to Wishlist"}
            </button> */}
            <button
              className="product-card__btn `"
              onClick={() =>
                !inWishlist
                  ? dispatch({ type: "addToWishlist", payload: prod })
                  : dispatch({ type: "removeFromWishlist", payload: prod })
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
                    dispatch({ type: "increaseQuantity", payload: id })
                  }
                >
                  Add again
                </button>
              )
            ) : (
              <button
                className="product-card__btn"
                onClick={() =>
                  dispatch({ type: "removeFromCart", payload: prod })
                }
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
