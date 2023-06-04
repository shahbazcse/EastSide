export default function AddressForm({ setShowForm }) {
  return (
    <div>
      <h3>Address Form</h3>
      <div></div>
      <button>Save</button>
      <button onClick={() => setShowForm(false)}>
        Cancel
      </button>
    </div>
  );
}
