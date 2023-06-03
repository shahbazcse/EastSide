import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import AddressCard from "../components/AddressCard";

export default function Checkout() {
  const {
    state: { products, address },
  } = useContext(AppContext);

  const cart = products.filter((p) => p.inCart);

  const totalPrice = cart.reduce(
    (acc, { price, units }) => acc + price * units,
    0
  );

  return (
    <div>
      <div className="card">
        <strong>
          <p>Choose a delivery address</p>
        </strong>
        {address.map((address) => (
          <AddressCard {...address} />
        ))}
      </div>
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
        <button>Place Order</button>
      </div>
    </div>
  );
}
