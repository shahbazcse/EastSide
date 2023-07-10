import { useContext, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { AuthContext } from "../contexts/AuthContext";
import { getWishlist } from "../services/UserService";
import { AppContext } from "../contexts/AppContext";

export default function WishList() {
  const {
    state: { token },
  } = useContext(AuthContext);

  const {
    state: { wishlist },
    dispatch,
  } = useContext(AppContext);

  useEffect(() => {
    (async () => {
      const response = await getWishlist(token);
      dispatch({ type: "updateWishlist", payload: response });
    })();
  }, []);

  return (
    <main className="wishlist-page">
      <h2 className="wishlist-header">Wishlist ({wishlist.length})</h2>
      {wishlist.length === 0 ? (
        <p className="wishlist-empty">Empty Wishlist!</p>
      ) : (
        <div className="wishlist-container">
          {wishlist.map((prod) => {
            return (
              <ProductCard {...prod} key={prod.id} />
            );
          })}
        </div>
      )}
    </main>
  );
}
