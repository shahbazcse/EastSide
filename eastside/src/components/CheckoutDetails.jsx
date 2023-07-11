export default function CheckoutDetails({
  cart,
  totalPrice,
  selectedAddress,
  setShowCheckout,
}) {
  return (
    <div className="checkout-container__details">
      <h3>Order Details</h3>
      <div className="flex-col-gap">
        <div className="flex-row font-bold">
          <p>Name</p>
          <p>Quantity</p>
        </div>
        <div className="flex-items-col">
          {cart.map(({ id, title, qty }) => (
            <div key={id}>
              <p style={{ textAlign: "left" }}>{title}</p>
              <p style={{ textAlign: "right" }}>{qty}</p>
            </div>
          ))}
        </div>
      </div>
      <hr />
      <h3>Price Details</h3>
      <div className="flex-col-gap">
        <div className="flex-items-col">
          <div className="flex-row font-bold">
            <p>Total Amount</p>
            <p>Rs. {totalPrice}</p>
          </div>
        </div>
      </div>
      <button
        className="place-order-btn"
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
