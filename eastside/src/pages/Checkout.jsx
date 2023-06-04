import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import AddressList from "../components/AddressList";
import CheckoutDetails from "../components/CheckoutDetails";
import OrderSummary from "../components/OrderSummary";

export default function Checkout() {
  const {
    state: { products },
  } = useContext(AppContext);

  const cart = products.filter((p) => p.inCart);

  const totalPrice = cart.reduce(
    (acc, { price, units }) => acc + price * units,
    0
  );

  const [showCheckout, setShowCheckout] = useState(false);

  const [selectedAddress, setSelectedAddress] = useState(null);

  return (
    <div>
      {!showCheckout && (
        <div>
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
