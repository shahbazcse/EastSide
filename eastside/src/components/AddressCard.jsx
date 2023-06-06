import { useContext, useState } from "react";
import EditingForm from "./EditingForm";
import { AppContext } from "../contexts/AppContext";

export default function AddressCard({
  address,
  selectedAddress,
  selectAddressHandler,
}) {
  const { dispatch } = useContext(AppContext);

  const [editing, setEditing] = useState(false);

  const { aId, name, street, city, state, zip, phone, country } = address;

  return (
    <div key={aId} className="address-input-container">
      {!editing && (
        <label className="address-label">
          <div className="address-details">
            <input
              className="address-radio"
              type="radio"
              checked={selectedAddress?.aId === aId}
              onChange={() => selectAddressHandler(aId)}
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
          <div style={{ padding: "15px 0px 0px" }}>
            {!editing && <button style={{ padding: "4px", margin: "0px 10px 0px 0px" }} onClick={() => setEditing(true)}>Edit</button>}
            {!editing && (
              <button
                style={{ padding: "4px" }}
                onClick={() =>
                  dispatch({ type: "deleteAddress", payload: aId })
                }
              >
                Delete
              </button>
            )}
          </div>
        </label>
      )}
      {editing && <EditingForm address={address} setEditing={setEditing} />}
    </div>
  );
}
