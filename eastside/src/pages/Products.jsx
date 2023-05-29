import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import ProductCard from "../components/ProductCard";
import FilterBar from "../components/FilterBar";

export default function Products() {
  const { state } = useContext(AppContext);
  const { data } = state;
  return (
    <div>
      <h1>Products</h1>
      <FilterBar />
      <div className="list">
        {data.map((prod) => (
          <ProductCard {...prod} key={prod.id} />
        ))}
      </div>
    </div>
  );
}
