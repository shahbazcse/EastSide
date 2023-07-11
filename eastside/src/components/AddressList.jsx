import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import AddressCard from "./AddressCard";
import AddressForm from "../components/AddressForm";

export default function AddressList({ selectedAddress, setSelectedAddress }) {
  const {
    state: { addresses },
  } = useContext(AppContext);

  const [showForm, setShowForm] = useState(false);

  const selectAddressHandler = (aId) => {
    setSelectedAddress(addresses.find((address) => address.aId === aId));
  };

  const addressPage = window.location.pathname === "/address";

  return (
    <div className="checkout-container__address">
      <strong>
        {addressPage ? (
          <p>Add a new address</p>
        ) : (
          <p>Choose a delivery address</p>
        )}
      </strong>
      {!addresses.length && <p>No address found</p>}
      {addresses.map((address) => (
        <AddressCard
          address={address}
          selectedAddress={selectedAddress}
          selectAddressHandler={selectAddressHandler}
          key={address.aId}
        />
      ))}
      {!showForm && (
        <button
          className="checkout-container__new-address"
          onClick={() => setShowForm(true)}
        >
          <h3>Add new address</h3>
        </button>
      )}
      {showForm && <AddressForm setShowForm={setShowForm} />}
    </div>
  );
}
