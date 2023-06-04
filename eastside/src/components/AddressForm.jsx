import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";

export default function AddressForm({ setShowForm }) {
  const {
    state: { addresses },
    dispatch,
  } = useContext(AppContext);

  const [newAddress, setNewAddress] = useState({
    aId: addresses.length + 1,
    name: "",
    street: "",
    city: "",
    state: "",
    zip: 0,
    phone: "",
    country: "",
  });

  const handleSave = () => {
    dispatch({ type: "addAddress", payload: newAddress });
    setShowForm(false);
  };

  return (
    <div className="card">
      <h3>Address Form</h3>
      <div>
        <div>
          <label>
            Name:{" "}
            <input
              onChange={(e) =>
                setNewAddress({ ...newAddress, name: e.target.value })
              }
              type="text"
            />
          </label>
          <hr />
          <label>
            Street:{" "}
            <input
              onChange={(e) =>
                setNewAddress({ ...newAddress, street: e.target.value })
              }
              type="text"
            />
          </label>
          <hr />
          <label>
            City:{" "}
            <input
              onChange={(e) =>
                setNewAddress({ ...newAddress, city: e.target.value })
              }
              type="text"
            />
          </label>
          <hr />
          <label>
            State:{" "}
            <input
              onChange={(e) =>
                setNewAddress({ ...newAddress, state: e.target.value })
              }
              type="text"
            />
          </label>
          <hr />
          <label>
            Zip Code:{" "}
            <input
              onChange={(e) =>
                setNewAddress({ ...newAddress, zip: e.target.value })
              }
              type="text"
            />
          </label>
          <hr />
          <label>
            Country:{" "}
            <input
              onChange={(e) =>
                setNewAddress({ ...newAddress, country: e.target.value })
              }
              type="text"
            />
          </label>
          <hr />
          <label>
            Phone:{" "}
            <input
              onChange={(e) =>
                setNewAddress({ ...newAddress, phone: e.target.value })
              }
              type="text"
            />
          </label>
          <hr />
        </div>
        <button onClick={() => handleSave()}>Save</button>
        <button onClick={() => setShowForm(false)}>Cancel</button>
      </div>
    </div>
  );
}
