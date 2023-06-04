export default function EditingForm({ setEditing }) {
  return (
    <div>
      <h3>Editing Form</h3>
      <div></div>
      <button>Save</button>
      <button onClick={() => setEditing(false)}>Cancel</button>
    </div>
  );
}
