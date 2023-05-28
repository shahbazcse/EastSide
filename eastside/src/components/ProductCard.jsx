import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

export default function ProductCard({ ...prod }) {
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
  } = prod;
  const cartPage = window.location.pathname === "/cart";

  const { dispatch } = useContext(AppContext);

  return (
    <div key={id} className="card">
      <strong>
        <p>{name}</p>
      </strong>
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
      {cartPage && <p>Quantity in cart: {units}</p>}
      <button
        onClick={() =>
          !inWishlist
            ? dispatch({ type: "addToWishlist", payload: prod })
            : dispatch({ type: "removeFromWishlist", payload: prod })
        }
      >
        {!inWishlist ? "Add to Wishlist" : "Remove from wishlist"}
      </button>
      <button
        onClick={() =>
          !cartPage
            ? dispatch({ type: "addToCart", payload: prod })
            : dispatch({ type: "removeFromCart", payload: prod })
        }
      >
        {!cartPage ? "Add to cart" : "Remove from cart"}
      </button>
    </div>
  );
}
