import { useContext, useEffect, useState } from "react";
import CartCard from "../components/CartCard";
import { AppContext } from "../contexts/AppContext";

export default function Cart() {
  const { cart } = useContext(AppContext);

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
          <CartCard {...prod} key={prod.id} />
        ))}
      </div>
      {itemCount && (
        <div className="card">
          <h3>CART PRICE DETAILS</h3>
          <hr />
          {cart.map(({ name, units, price }) => (
            <p>
              <span>
                {name} ({units}) Rs.{price}
              </span>
            </p>
          ))}
          <hr />
          <p>
            <strong>Total Price:</strong> Rs.{totalPrice}
          </p>
          <button
            style={{
              borderRadius: "16px",
              padding: "0.5rem",
              backgroundColor: "blue",
              color: "white",
            }}
          >
            CHECKOUT
          </button>
        </div>
      )}
    </div>
  );
}
