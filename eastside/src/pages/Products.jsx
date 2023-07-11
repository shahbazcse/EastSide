import { useContext, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import FilterBar from "../components/FilterBar";
import { FilterContext } from "../contexts/FilterContext";
import { Oval } from "react-loader-spinner";

export default function Products() {
  const { filteredData } = useContext(FilterContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  });

  return (
    <main className="products-page">
      <FilterBar />
      <section className="products-container">
        {loading ? (
          <div className="flex mt-56 items-center justify-center">
            <Oval
              height={90}
              width={90}
              color="#424242"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#cb997e"
              strokeWidth={3}
              strokeWidthSecondary={2}
            />
          </div>
        ) : (
          <div className="products-items">
            {filteredData.map((prod) => (
              <ProductCard {...prod} key={prod.id} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
