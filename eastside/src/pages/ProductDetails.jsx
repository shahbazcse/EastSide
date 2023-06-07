import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";

export default function ProductDetails() {
  const { productId } = useParams();

  const { state } = useContext(AppContext);

  const allProducts = [...state.products];

  const prod = allProducts.find((p) => p.id === productId);

  const {
    id,
    title,
    price,
    category,
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
    <main className="product-detail-page">
      <div className="product-detail-card">
        <div className="product-img">
          <img src={image} alt="Sample" />
        </div>
        <div className="product-detail">
          <div className="product-detail__info">
            <div className="product-detail__info-header">
              <h2 className="product-detail__info-header_name">{title}</h2>
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
                <p className="product-detail__info-price__final">₹{price}</p>
              </div>
            </div>
            <hr />
            <div className="product-detail__info-main">
              <div className="product-detail__info-main__row">
                <p>
                  <b>Category :</b>
                </p>
                <p>{category}</p>
              </div>
              <div className="product-detail__info-main__row">
                <p>
                  <b>Available In Stock :</b>
                </p>
                <p>{rating.count}</p>
              </div>
            </div>
          </div>
          <div className="product-detail__btn-group">
            {cartPage && (
              <span>
                <button
                  onClick={() =>
                    dispatch({ type: "decreaseQuantity", payload: id })
                  }
                >
                  -
                </button>
                <span> {units} </span>
                <button
                  onClick={() =>
                    dispatch({ type: "increaseQuantity", payload: id })
                  }
                >
                  +
                </button>
              </span>
            )}
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
                Remove From Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
