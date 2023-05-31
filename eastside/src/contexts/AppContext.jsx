import { createContext, useEffect, useReducer } from "react";
import { fakeFetch } from "../api/fakeFetch";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const addToCart = (state, action) => {
    const modified = state.products.map((p) =>
      p.id === action.payload.id ? { ...p, inCart: true } : { ...p }
    );
    return {
      ...state,
      products: [...modified],
    };
  };

  const removeFromCart = (state, action) => {
    const modified = state.products.map((p) =>
      p.id === action.payload.id ? { ...p, inCart: false } : { ...p }
    );
    return {
      ...state,
      products: [...modified],
    };
  };

  const addToWishList = (state, action) => {
    const foundInWishlist = state.products.find(
      (p) => p.id === action.payload.id && p.inWishlist
    );
    const modified = state.products.map((p) =>
      p.id === action.payload.id ? { ...p, inWishlist: true } : { ...p }
    );
    if (!foundInWishlist) {
      return {
        ...state,
        products: [...modified],
      };
    }
  };

  const removeFromWishList = (state, action) => {
    const foundInWishlist = state.products.find(
      (p) => p.id === action.payload.id && p.inWishlist
    );
    const modified = state.products.map((p) =>
      p.id === action.payload.id ? { ...p, inWishlist: false } : { ...p }
    );
    if (foundInWishlist) {
      return {
        ...state,
        products: [...modified],
      };
    }
  };

  const increaseQuantity = (state, action) => {
    const modified = state.products.map((p) =>
      p.id === action.payload ? { ...p, units: p.units + 1 } : { ...p }
    );
    return {
      ...state,
      products: [...modified],
    };
  };

  const decreaseQuantity = (state, action) => {
    const modified = state.products.map((p) =>
      p.id === action.payload
        ? p.units > 1
          ? { ...p, units: p.units - 1 }
          : { ...p, inCart: false }
        : { ...p }
    );
    return {
      ...state,
      products: [...modified],
    };
  };

  const reducerFn = (state, action) => {
    switch (action.type) {
      case "setDB":
        return {
          ...state,
          products: [...action.payload],
        };
      case "addToCart":
        return addToCart(state, action);
      case "removeFromCart":
        return removeFromCart(state, action);
      case "addToWishlist":
        return addToWishList(state, action);
      case "removeFromWishlist":
        return removeFromWishList(state, action);
      case "increaseQuantity":
        return increaseQuantity(state, action);
      case "decreaseQuantity":
        return decreaseQuantity(state, action);
      default:
        return state;
    }
  };

  const initialState = {
    products: [],
  };

  const [state, dispatch] = useReducer(reducerFn, initialState);

  const getData = async () => {
    try {
      const response = await fakeFetch("https://example.com/api/products");
      const db = response.data.products.map((p) => ({
        ...p,
        inCart: false,
        inWishlist: false,
        units: 1,
      }));
      dispatch({ type: "setDB", payload: db });
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
