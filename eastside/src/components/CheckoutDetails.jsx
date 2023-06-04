import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

export default function CheckoutDetails({ cart, totalPrice, setShowCheckout }) {
  const {
    state: { selectedAddress },
  } = useContext(AppContext);

  return (
    <div className="card">
      <strong>
        <p>Order Details</p>
      </strong>
      <strong>
        <p style={{ textAlign: "left" }}>Name</p>
        <p style={{ textAlign: "right" }}>Quantity</p>
      </strong>
      {cart.map(({ id, name, units }) => (
        <p key={id}>
          <p style={{ textAlign: "left" }}>{name}</p>
          <p style={{ textAlign: "right" }}>{units}</p>
        </p>
      ))}
      <hr />
      <strong>
        <p>Price Details</p>
      </strong>
      <p>Price: {totalPrice}</p>
      <p>Discount: </p>
      <strong>
        <p>Total Amount: {totalPrice}</p>
      </strong>
      <button
        onClick={() =>
          selectedAddress.length === 1
            ? setShowCheckout(true)
            : console.log("Please select an address to proceed")
        }
      >
        Place Order
      </button>
    </div>
  );
}
