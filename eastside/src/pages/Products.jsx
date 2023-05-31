import { useContext } from "react";
import ProductCard from "../components/ProductCard";
import FilterBar from "../components/FilterBar";
import { FilterContext } from "../contexts/FilterContext";

export default function Products() {
  const { filteredData } = useContext(FilterContext);
  return (
    <div>
      <h1>Products</h1>
      <FilterBar />
      <div className="list">
        {filteredData.map((prod) => (
          <ProductCard {...prod} key={prod.id} />
        ))}
      </div>
    </div>
  );
}
