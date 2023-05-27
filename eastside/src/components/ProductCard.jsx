export default function ProductCard({
  id,
  name,
  description,
  price,
  quantity,
  category,
  brand,
}) {
  return (
    <div key={id} className="card">
      <strong>
        <p>{name}</p>
      </strong>
      <p><strong>Brand:</strong> {brand}</p>
      <p><strong>About:</strong> {description}</p>
      <p><strong>Price:</strong> Rs.{price}</p>
      <p><strong>Available In Stock:</strong> {quantity}</p>
      <p><strong>Category:</strong> {category}</p>
    </div>
  );
}
