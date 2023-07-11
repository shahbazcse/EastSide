export default function OrderSummary({
  cart,
  totalPrice,
  selectedAddress,
  setShowCheckout,
}) {
  const { name, street, city, state, zip, phone, country } = selectedAddress;

  return (
    <div
      style={{ display: "flex", justifyContent: "center", margin: "2.5rem" }}
    >
      <div className="checkout-container__details">
        <h3>Order Summary</h3>
        <div className="flex-col-gap">
          <div className="flex-row font-bold">
            <p>Name</p>
            <p>Quantity</p>
          </div>
          <div className="flex-items-col">
            {cart.map(({ id, title, units }) => (
              <div key={id}>
                <p style={{ textAlign: "left" }}>{title}</p>
                <p style={{ textAlign: "right" }}>{units}</p>
              </div>
            ))}
          </div>
        </div>
        <hr />
        <strong>
          <p>Your order will be delivered here:</p>
        </strong>
        <div>
          <p>
            <strong>{name}</strong>
          </p>
          <p>
            {street}, {city}
          </p>
          <p>
            {state}, {zip}, {country}
          </p>
          <p>
            <strong>{phone}</strong>
          </p>
          <button
            onClick={() => setShowCheckout(false)}
            className="bg-slate-500 text-white p-1 mt-2 rounded"
          >
            Change address
          </button>
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
        <button className="place-order-btn">Pay Now</button>
        <button
          className="place-order-btn"
          onClick={() => setShowCheckout(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
