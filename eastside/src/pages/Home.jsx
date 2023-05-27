import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/products">
        <button className="explore-btn">Explore Products</button>
      </Link>
    </div>
  );
}
