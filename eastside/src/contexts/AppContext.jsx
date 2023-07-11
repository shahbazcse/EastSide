import { createContext, useEffect, useReducer } from "react";
import { getAllProducts } from "../services/UserService";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const updateCart = (state, action) => {
    return {
      ...state,
      cart: action.payload,
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

  const updateWishlist = (state, action) => {
    return {
      ...state,
      wishlist: action.payload,
    };
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
      case "updateCart":
        return updateCart(state, action);
      case "removeFromCart":
        return removeFromCart(state, action);
      case "updateWishlist":
        return updateWishlist(state, action);
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
    cart: [],
    wishlist: [],
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

  useEffect(() => {
    (async () => {
      const products = await getAllProducts();
      dispatch({ type: "setDB", payload: products });
    })();
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
