import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import ProductCard from "../components/ProductCard";

export default function WishList() {
  const { state } = useContext(AppContext);
  const { wishlist } = state;

  return (
    <div>
      <h1>Wishlist</h1>
      <div className="list">
        {wishlist.map((prod) => (
          <ProductCard {...prod} key={prod.id} />
        ))}
      </div>
    </div>
  );
}
