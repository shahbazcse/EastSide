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
      {cart.map(({ id, name, units }) => (
        <div key={id}>
          <p style={{ textAlign: "left" }}>{name}</p>
          <p style={{ textAlign: "right" }}>{units}</p>
        </div>
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
