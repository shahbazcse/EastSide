import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const { state } = useContext(AppContext);
  const { data } = state;
  return (
    <div style={{ margin: "1rem" }}>
      <h1>Products</h1>
      <div className="list">
        {data.map((prod) => (
          <ProductCard {...prod} key={prod.id} />
        ))}
      </div>
    </div>
  );
}
