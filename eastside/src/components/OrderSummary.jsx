export default function OrderSummary({
  cart,
  totalPrice,
  selectedAddress,
  setShowCheckout,
}) {
  const { name, street, city, state, zip, phone, country } = selectedAddress;

  return (
    <div>
      <h3>Order Summary</h3>
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
        </div>

        <strong>
          <p>Price Details</p>
        </strong>
        <p>Price: Rs.{totalPrice}</p>
        <p>Discount: </p>
        <strong>
          <p>Total Amount: Rs.{totalPrice}</p>
        </strong>
        <button>Pay Now</button>
        <button onClick={() => setShowCheckout(false)}>Cancel</button>
      </div>
    </div>
  );
}
