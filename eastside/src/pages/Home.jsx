import { useContext } from "react";
import { Link } from "react-router-dom";
import { FilterContext } from "../contexts/FilterContext";

export default function Home() {
  const { setCategoryFromHome } = useContext(FilterContext);
  return (
    <div>
      <h1>Home</h1>
      <Link to="/products">
        <button className="explore-btn">Explore All Products</button>
      </Link>
      <div>
        <Link to="/products">
          <button
            onClick={() => setCategoryFromHome("Smartphones")}
            className="explore-btn"
            style={{ margin: "1rem" }}
          >
            Latest Smartphones
          </button>
        </Link>
        <Link to="/products">
          <button
            onClick={() => setCategoryFromHome("Laptops")}
            className="explore-btn"
            style={{ margin: "1rem" }}
          >
            Latest Laptops
          </button>
        </Link>
      </div>
    </div>
  );
}
