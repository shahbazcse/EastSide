import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import AddressCard from "./AddressCard";
import AddressForm from "../components/AddressForm";

export default function AddressList() {
  const {
    state: { addresses },
  } = useContext(AppContext);
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="card">
      <strong>
        <p>Choose a delivery address</p>
      </strong>
      {addresses.map((address) => (
        <AddressCard address={address} key={address.aId} />
      ))}
      {!showForm && (
        <button onClick={() => setShowForm(true)}>Add new address</button>
      )}
      {showForm && <AddressForm setShowForm={setShowForm} />}
    </div>
  );
}
