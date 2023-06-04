import { useContext, useState } from "react";
import EditingForm from "./EditingForm";
import { AppContext } from "../contexts/AppContext";

export default function AddressCard({ address }) {
  const {
    state: { selectedAddress },
    dispatch,
  } = useContext(AppContext);

  const [editing, setEditing] = useState(false);

  const { aId, name, street, city, state, zip, phone, country } = address;

  return (
    <div key={aId} className="card">
      {!editing && <button onClick={() => setEditing(true)}>Edit</button>}
      {editing && <EditingForm setEditing={setEditing} />}
      {!editing && (
        <div>
          <input
            type="radio"
            checked={selectedAddress.aId === address.aId}
            onChange={() =>
              dispatch({ type: "selectAddress", payload: address })
            }
          />
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
      )}
    </div>
  );
}
