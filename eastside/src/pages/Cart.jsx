import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import ProductCard from "../components/ProductCard";

export default function Cart() {
  const {
    state: { products },
  } = useContext(AppContext);

  const cart = products.filter((p) => p.inCart);

  const totalPrice = cart.reduce(
    (acc, { price, units }) => acc + price * units,
    0
  );

  const itemCount = cart.length > 0;

  return (
    <div>
      <h1>Cart</h1>
      <div>
        {cart.map((prod) => (
          <ProductCard {...prod} key={prod.id} />
        ))}
      </div>
      {itemCount ? (
        <div className="card">
          <h3>CART PRICE DETAILS</h3>
          <hr />
          {cart.map(({ id, name, units, price }) => (
            <p key={id}>
              <span>
                {name} ({units}) Rs.{price}
              </span>
            </p>
          ))}
          <hr />
          <p>
            <strong>Total Price:</strong> Rs.{totalPrice}
          </p>
          <Link to="/checkout">
            <button
              style={{
                borderRadius: "16px",
                padding: "0.5rem",
                backgroundColor: "blue",
                color: "white",
                cursor: "pointer",
              }}
            >
              CHECKOUT
            </button>
          </Link>
        </div>
      ) : (
        <p>Cart Empty</p>
      )}
    </div>
  );
}
