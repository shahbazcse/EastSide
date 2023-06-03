export default function AddressForm({
  aId,
  name,
  street,
  city,
  state,
  zip,
  phone,
  country,
}) {
  return (
    <div key={aId}>
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
  );
}
