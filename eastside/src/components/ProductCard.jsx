import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { Link } from "react-router-dom";

export default function ProductCard({ ...prod }) {
  const { id, title, description, price, category, image, rating } = prod;

  const cartPage = window.location.pathname === "/cart";
  const wishlistPage = window.location.pathname === "/wishlist";

  const { dispatch } = useContext(AppContext);

  const inWishlist = false;
  const inCart = false;

  return (
    <div key={id} className="card">
      <img src={image} alt="Book" />
      <Link to={`/products/product/${id}`}>
        <strong>
          <p>{title}</p>
        </strong>
      </Link>
      <p>
        <strong>Price:</strong> Rs.{price}
      </p>
      <p>
        <strong>Available In Stock:</strong> {rating.count}
      </p>
      <p>
        <strong>Category:</strong> {category}
      </p>
      {cartPage && (
        <span>
          <button
          // onClick={() => dispatch({ type: "decreaseQuantity", payload: id })}
          >
            -
          </button>
          {/* <span> {units} </span> */}
          <button
          // onClick={() => dispatch({ type: "increaseQuantity", payload: id })}
          >
            +
          </button>
        </span>
      )}
      <button
      // onClick={() =>
      //   !inWishlist
      //     ? dispatch({ type: "addToWishlist", payload: prod })
      //     : dispatch({ type: "removeFromWishlist", payload: prod })
      // }
      >
        {!inWishlist ? "Add to Wishlist" : "Remove from wishlist"}
      </button>
      {!cartPage ? (
        !inCart ? (
          <button
          // onClick={() => dispatch({ type: "addToCart", payload: prod })}
          >
            Add To Cart
          </button>
        ) : !wishlistPage ? (
          <button>
            <Link to="/cart" style={{ textDecoration: "none", color: "black" }}>
              Go to Cart
            </Link>
          </button>
        ) : (
          <button
          // onClick={() => dispatch({ type: "increaseQuantity", payload: id })}
          >
            Add again
          </button>
        )
      ) : (
        <button
        // onClick={() => dispatch({ type: "removeFromCart", payload: prod })}
        >
          Remove From Cart
        </button>
      )}
    </div>
  );
}
