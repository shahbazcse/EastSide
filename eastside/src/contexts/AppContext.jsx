import { createContext, useEffect, useReducer } from "react";

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

  const addAddress = (state, action) => {
    return {
      ...state,
      addresses: [...state.addresses, { ...action.payload }],
    };
  };

  const updateAddress = (state, action) => {
    const modified = state.addresses.filter(
      ({ aId }) => aId !== action.payload.aId
    );

    return {
      ...state,
      addresses: [...modified, action.payload],
    };
  };

  const deleteAddress = (state, action) => {
    const curr = state.addresses.filter(({ aId }) => aId !== action.payload);
    return {
      ...state,
      addresses: [...curr],
    };
  };

  const reducerFn = (state, action) => {
    switch (action.type) {
      case "setDB":
        return {
          ...state,
          products: action.payload,
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
      case "addAddress":
        return addAddress(state, action);
      case "updateAddress":
        return updateAddress(state, action);
      case "deleteAddress":
        return deleteAddress(state, action);
      default:
        return state;
    }
  };

  const initialState = {
    products: [],
    addresses: [
      {
        aId: 1,
        name: "John Doe",
        street: "350 Afco Rd",
        city: "West Memphis",
        state: "Arizona",
        zip: 72301,
        phone: "(870) 702-2051",
        country: "United States",
      },
    ],
  };

  const [state, dispatch] = useReducer(reducerFn, initialState);

  const getData = async () => {
    try {
      const response = await fetch("/api/products");
      const products = await response.json();

      // const response = await fakeFetch("https://example.com/api/products");
      // const db = response.data.products.map((p) => ({
      //   ...p,
      //   inCart: false,
      //   inWishlist: false,
      //   units: 1,
      // }));
      // dispatch({ type: "setDB", payload: db });

      dispatch({ type: "setDB", payload: products.products });
    } catch (e) {
      console.error(e);
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
