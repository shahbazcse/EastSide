import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import AddressList from "../components/AddressList";
import CheckoutDetails from "../components/CheckoutDetails";
import OrderSummary from "../components/OrderSummary";

export default function Checkout() {
  const {
    state: { cart },
  } = useContext(AppContext);

  const totalPrice = cart.reduce((acc, { price, qty }) => acc + price * qty, 0);

  const [showCheckout, setShowCheckout] = useState(false);

  const [selectedAddress, setSelectedAddress] = useState(null);

  return (
    <div>
      {!showCheckout && (
        <div className="checkout-page">
          <h2 className="checkout-header">Checkout</h2>
          <div className="checkout-container">
            <AddressList
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
            />

            <CheckoutDetails
              cart={cart}
              totalPrice={totalPrice}
              selectedAddress={selectedAddress}
              setShowCheckout={setShowCheckout}
            />
          </div>
        </div>
      )}
      {showCheckout && (
        <OrderSummary
          cart={cart}
          totalPrice={totalPrice}
          selectedAddress={selectedAddress}
          setShowCheckout={setShowCheckout}
        />
      )}
    </div>
  );
}
