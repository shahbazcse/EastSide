import { useContext } from "react";
import ProductCard from "../components/ProductCard";
import FilterBar from "../components/FilterBar";
import { FilterContext } from "../contexts/FilterContext";

export default function Products() {
  const { filteredData } = useContext(FilterContext);
  return (
    <main className="products-page">
      <FilterBar />
      <section className="products-container">
        <div className="products-items">
          {filteredData.map((prod) => (
            <ProductCard {...prod} key={prod.id} />
          ))}
        </div>
      </section>
    </main>
  );
}
