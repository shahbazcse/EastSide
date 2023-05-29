import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";

export default function ProductDetails() {
  const { productId } = useParams();

  const { state, dispatch } = useContext(AppContext);
  const { data } = state;

  const prod = data.find(({ id }) => id === Number(productId));

  const {
    id,
    name,
    description,
    price,
    quantity,
    category,
    brand,
    units,
    inWishlist,
    inCart
  } = prod;

  const cartPage = window.location.pathname === "/cart";

  return (
    <div key={id} className="card">
      <Link to={`/products/product/${id}`}>
        <strong>
          <p>{name}</p>
        </strong>
      </Link>
      <p>
        <strong>Brand:</strong> {brand}
      </p>
      <p>
        <strong>About:</strong> {description}
      </p>
      <p>
        <strong>Price:</strong> Rs.{price}
      </p>
      <p>
        <strong>Available In Stock:</strong> {quantity}
      </p>
      <p>
        <strong>Category:</strong> {category}
      </p>
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
            onClick={() => dispatch({ type: "addToCart", payload: prod })}
          >
            Add To Cart
          </button>
        ) : (
          <button>
            <Link
              to="/cart"
              style={{ textDecoration: "none", color: "black" }}
            >
              Go to Cart
            </Link>
          </button>
        )
      ) : (
        <button
          onClick={() => dispatch({ type: "removeFromCart", payload: prod })}
        >
          Remove From Cart
        </button>
      )}
    </div>
  );
}
