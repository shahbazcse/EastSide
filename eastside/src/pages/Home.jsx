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
      <h1>Home</h1>
      <Link to="/products">
        <button className="explore-btn">Explore All Products</button>
      </Link>
      <div>
        {allCategories.map(({ _id, categoryName }) => {
          return (
            <Link to="/products" key={_id}>
              <button
                onClick={() => setCategoryFromHome(categoryName)}
                className="explore-btn"
                style={{ margin: "1rem" }}
              >
                {categoryName}
              </button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
