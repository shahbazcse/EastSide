export default function CheckoutDetails({
  cart,
  totalPrice,
  selectedAddress,
  setShowCheckout,
}) {
  return (
    <div className="card">
      <strong>
        <p>Order Details</p>
      </strong>
      <strong>
        <p style={{ textAlign: "left" }}>Name</p>
        <p style={{ textAlign: "right" }}>Quantity</p>
      </strong>
      {cart.map(({ id, title, units }) => (
        <div key={id}>
          <p style={{ textAlign: "left" }}>{title}</p>
          <p style={{ textAlign: "right" }}>{units}</p>
        </div>
      ))}
      <hr />
      <strong>
        <p>Price Details</p>
      </strong>
      <p>Price: Rs.{totalPrice}</p>
      <strong>
        <p>Total Amount: Rs.{totalPrice}</p>
      </strong>
      <button
        onClick={() =>
          selectedAddress
            ? setShowCheckout(true)
            : alert("Please select an address to proceed")
        }
      >
        Place Order
      </button>
    </div>
  );
}
