import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

export default function ProductCard({ ...prod }) {
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

  const navigate = useNavigate();
  const cartPage = window.location.pathname === "/cart";
  const wishlistPage = window.location.pathname === "/wishlist";

  const { dispatch } = useContext(AppContext);

  return (
    <div key={id} className="product-card">
      <div
        className="product-card__image"
        onClick={() => navigate(`/products/product/${id}`)}
      >
        <img src={image} alt="Sample" />
      </div>
      <div className="product-card__details">
        <div
          className="product-card__details-title"
          onClick={() => navigate(`/products/product/${id}`)}
        >
          <strong>
            <p>{title}</p>
          </strong>
        </div>
        <p>
          <strong>Price:</strong> Rs.{price}
        </p>
        <p>
          <strong>Available In Stock:</strong> {rating.count}
        </p>
        <p>
          <strong>Category:</strong> {category}
        </p>
      </div>
      {cartPage && (
        <span>
          <button
            onClick={() => dispatch({ type: "decreaseQuantity", payload: id })}
          >
            -
          </button>
          <span> {units} </span>
          <button
            onClick={() => dispatch({ type: "increaseQuantity", payload: id })}
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
            <Link to="/cart" style={{ textDecoration: "none", color: "black" }}>
              Go to Cart
            </Link>
          </button>
        ) : (
          <button
            className="product-card__btn in-cart-btn"
            onClick={() => dispatch({ type: "increaseQuantity", payload: id })}
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
