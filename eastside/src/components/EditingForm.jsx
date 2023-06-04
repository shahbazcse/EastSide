import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";

export default function EditingForm({ address, setEditing }) {
  const { dispatch } = useContext(AppContext);

  const [updateAddress, setUpdateAddress] = useState({ ...address });

  const handleSave = () => {
    dispatch({ type: "updateAddress", payload: updateAddress });
    setEditing(false);
  };

  return (
    <div>
      <h3>Editing Form</h3>
      <div>
        <div>
          <label>
            Name:{" "}
            <input
              defaultValue={updateAddress.name}
              onChange={(e) =>
                setUpdateAddress({ ...updateAddress, name: e.target.value })
              }
              type="text"
            />
          </label>
          <hr />
          <label>
            Street:{" "}
            <input
              defaultValue={updateAddress.street}
              onChange={(e) =>
                setUpdateAddress({ ...updateAddress, street: e.target.value })
              }
              type="text"
            />
          </label>
          <hr />
          <label>
            City:{" "}
            <input
              defaultValue={updateAddress.city}
              onChange={(e) =>
                setUpdateAddress({ ...updateAddress, city: e.target.value })
              }
              type="text"
            />
          </label>
          <hr />
          <label>
            State:{" "}
            <input
              defaultValue={updateAddress.state}
              onChange={(e) =>
                setUpdateAddress({ ...updateAddress, state: e.target.value })
              }
              type="text"
            />
          </label>
          <hr />
          <label>
            Zip Code:{" "}
            <input
              defaultValue={updateAddress.zip}
              onChange={(e) =>
                setUpdateAddress({ ...updateAddress, zip: e.target.value })
              }
              type="text"
            />
          </label>
          <hr />
          <label>
            Country:{" "}
            <input
              defaultValue={updateAddress.country}
              onChange={(e) =>
                setUpdateAddress({ ...updateAddress, country: e.target.value })
              }
              type="text"
            />
          </label>
          <hr />
          <label>
            Phone:{" "}
            <input
              defaultValue={updateAddress.phone}
              onChange={(e) =>
                setUpdateAddress({ ...updateAddress, phone: e.target.value })
              }
              type="text"
            />
          </label>
          <hr />
        </div>
      </div>
      <button onClick={() => handleSave()}>Save</button>
      <button onClick={() => setEditing(false)}>Cancel</button>
    </div>
  );
}
