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
            onClick={() => setCategoryFromHome("men's clothing")}
            className="explore-btn"
            style={{ margin: "1rem" }}
          >
            Men
          </button>
        </Link>
        <Link to="/products">
          <button
            onClick={() => setCategoryFromHome("jewelery")}
            className="explore-btn"
            style={{ margin: "1rem" }}
          >
            Jewellery
          </button>
        </Link>
        <Link to="/products">
          <button
            onClick={() => setCategoryFromHome("electronics")}
            className="explore-btn"
            style={{ margin: "1rem" }}
          >
            Electronics
          </button>
        </Link>
        <Link to="/products">
          <button
            onClick={() => setCategoryFromHome("women's clothing")}
            className="explore-btn"
            style={{ margin: "1rem" }}
          >
            Women
          </button>
        </Link>
      </div>
    </div>
  );
}
