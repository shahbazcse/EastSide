import { createContext, useContext, useReducer } from "react";
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

  const setCategoryFromHome = (category) => {
    dispatch({ type: "clearFilters" });
    dispatch({ type: "setCategories", payload: category, checked: true });
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
        p.rating.rate >= state.rating &&
        (!state.query.length ||
          p.title.toLowerCase().includes(state.query.toLowerCase()))
    )
    .sort((a, b) =>
      state.sortBy === "HTL" ? b.price - a.price : a.price - b.price
    );

  return (
    <FilterContext.Provider
      value={{ state, dispatch, filteredData, setCategoryFromHome }}
    >
      {children}
    </FilterContext.Provider>
  );
}
