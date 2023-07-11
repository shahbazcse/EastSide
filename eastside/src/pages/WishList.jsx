import { useContext, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { AuthContext } from "../contexts/AuthContext";
import { getWishlist } from "../services/UserService";
import { AppContext } from "../contexts/AppContext";
import { Oval } from "react-loader-spinner";

export default function WishList() {
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  });

  return (
    <>
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
      )}
    </>
  );
}
