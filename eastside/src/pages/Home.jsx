import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FilterContext } from "../contexts/FilterContext";

export default function Home() {
  const { setCategoryFromHome } = useContext(FilterContext);

  const [allCategories, setAllCategories] = useState([]);

  const getCategories = async () => {
    const response = await fetch("/api/categories");
    const { categories } = await response.json();
    setAllCategories(await categories);
  };

  useEffect(() => {
    getCategories();
  });

  return (
    <div>
      <main className="home">
        <section className="categories">
          <h1 className="categories__title">Explore Categories</h1>
          <div className="categories__container">
            {allCategories.map(({ _id, categoryName, description }) => {
              return (
                <Link
                  to="/products"
                  key={_id}
                  onClick={() => setCategoryFromHome(categoryName)}
                >
                  <div className="categories-card">
                    <h1 className="categories-card__title">{categoryName}</h1>
                    <p>{description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
