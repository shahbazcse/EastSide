import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import ProductCard from "../components/ProductCard";

export default function WishList() {
  const {
    state: { products },
  } = useContext(AppContext);

  const wishlist = products.filter((p) => p.inWishlist);

  return (
    <main className="wishlist-page">
      <h2 className="wishlist-header">Wishlist ({wishlist.length})</h2>
      {wishlist.length === 0 ? (
        <p className="wishlist-empty">Empty Wishlist!</p>
      ) : (
        <div className="wishlist-container">
          {wishlist.map((prod) => {
            return <ProductCard {...prod} key={prod.id} />;
          })}
        </div>
      )}
    </main>
  );
}
