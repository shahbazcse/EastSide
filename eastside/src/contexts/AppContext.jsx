import { createContext, useEffect, useReducer } from "react";
import { fakeFetch } from "../api/fakeFetch";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const reducerFn = (state, action) => {
    switch (action.type) {
      case "updateData":
        return {
          data: [...action.modified],
          cart: [...state.data.filter((p) => p.inCart)],
          wishlist: [...state.data.filter((p) => p.inWishlist)],
        };
      default:
        return state;
    }
  };

  const initialState = {
    data: [],
    cart: [],
    wishlist: [],
  };

  const [state, dispatch] = useReducer(reducerFn, initialState);

  const getData = async () => {
    try {
      const response = await fakeFetch("https://example.com/api/products");
      const modified = response.data.products.map((p) => ({
        ...p,
        inCart: false,
        inWishlist: false,
        units: 1,
      }));
      dispatch({ type: "updateData", modified });
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const addToCart = (prod) => {
    const foundInCart = state.cart.find((p) => p.id === prod.id);
    const modified = foundInCart
      ? state.data.map((p) =>
          p.id === prod.id ? { ...p, units: p.units + 1 } : { ...p }
        )
      : state.data.map((p) =>
          p.id === prod.id ? { ...p, inCart: true } : { ...p }
        );
    dispatch({ type: "updateData", modified });
  };

  const removeFromCart = (prod) => {
    // multiple quantity logic
    // const modified = state.cart.map((p) => {
    //   if (p.id === prod.id) {
    //     if (p.units > 1) return { ...p, units: p.units - 1 };
    //   } else return { ...p };
    // });

    const modified = state.cart.filter((p) => p.id !== prod.id);
  };

  const addToWishList = (prod) => {
    const foundInWishlist = state.wishlist.find((p) => p.id === prod.id);
    const modified = state.data.map((p) =>
      p.id === prod.id ? { ...p, inWishlist: true } : { ...p }
    );
    if (!foundInWishlist) {
      dispatch({ type: "updateData", modified });
    }
  };

  const removeFromWishList = (prod) => {
    const foundInWishlist = state.wishlist.find((p) => p.id === prod.id);
    const modified = state.data.map((p) =>
      p.id === prod.id ? { ...p, inWishlist: false } : { ...p }
    );
    if (foundInWishlist) {
      dispatch({ type: "updateData", modified });
    }
  };

  return (
    <AppContext.Provider
      value={{
        state,
        addToCart,
        removeFromCart,
        addToWishList,
        removeFromWishList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
