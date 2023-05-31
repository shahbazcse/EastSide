import { createContext, useContext, useEffect, useReducer } from "react";
import { AppContext } from "./AppContext";

export const FilterContext = createContext();

export function FilterProvider({ children }) {
  const {
    state: { products },
  } = useContext(AppContext);

  const reducerFn = (state, action) => {
    switch (action.type) {
      case "setSort":
        return {
          ...state,
          sortBy: action.payload,
        };
      case "setCategories":
        return action.checked
          ? {
              ...state,
              categories: [...state.categories, action.payload],
            }
          : {
              ...state,
              categories: [
                ...state.categories.filter((c) => c !== action.payload),
              ],
            };
      case "setRating":
        return {
          ...state,
          rating: action.payload,
        };
      case "setQuery":
        return {
          ...state,
          query: action.payload,
        };
      case "clearFilters":
        return {
          ...state,
          sortBy: "",
          categories: [],
          rating: 0,
          query: "",
        };
      default:
        return state;
    }
  };

  const initialState = {
    sortBy: "",
    categories: [],
    rating: 0,
    query: "",
  };

  const [state, dispatch] = useReducer(reducerFn, initialState);

  const filteredData = products
    .filter(
      (p) =>
        (!state.categories.length || state.categories.includes(p.category)) &&
        p.rating >= state.rating &&
        (!state.query.length ||
          p.name.toLowerCase().includes(state.query.toLowerCase()))
    )
    .sort((a, b) =>
      state.sortBy === "LTH" ? a.price - b.price : b.price - a.price
    );

  return (
    <FilterContext.Provider value={{ state, dispatch, filteredData }}>
      {children}
    </FilterContext.Provider>
  );
}
