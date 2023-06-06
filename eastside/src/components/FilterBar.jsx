import { useContext } from "react";
import { FilterContext } from "../contexts/FilterContext";

export default function FilterBar() {
  const { state, dispatch } = useContext(FilterContext);

  return (
    <aside className="filter-container show-filter">
      <div className="filter-head flex-gap">
        <button
          className="filter-clear-btn"
          onClick={() => dispatch({ type: "clearFilters" })}
        >
          Clear Filters
        </button>
      </div>
      <h4>Apply Filters:</h4>
      {/* <strong>
          <p>
            <input
              value={state.query}
              onChange={(e) =>
                dispatch({ type: "setQuery", payload: e.target.value })
              }
              placeholder="Search Products"
              type="text"
            />
          </p>
        </strong> */}
      <div className="filter-sort">
        <h4>Sort by Price:</h4>
        <div className="flex-gap">
          <label>
            <input
              value="LTH"
              checked={state.sortBy === "LTH"}
              onChange={(e) =>
                dispatch({ type: "setSort", payload: e.target.value })
              }
              type="radio"
            />{" "}
            price - Low-to-High
          </label>
          <label>
            <input
              value="HTL"
              checked={state.sortBy === "HTL"}
              onChange={(e) =>
                dispatch({ type: "setSort", payload: e.target.value })
              }
              type="radio"
            />{" "}
            price - High-to-Low
          </label>
        </div>
      </div>

      <div className="filter-category">
        <h4> Categories:</h4>
        <ul className="category-list flex-gap">
          <li className="category-list__item">
            <input
              checked={state.categories.includes("Men's Clothing")}
              value="Men's Clothing"
              onChange={(e) =>
                dispatch({
                  type: "setCategories",
                  payload: e.target.value,
                  checked: e.target.checked,
                })
              }
              type="checkbox"
            />{" "}
            Men
          </li>
          <li className="category-list__item">
            <input
              checked={state.categories.includes("Women's Clothing")}
              value="Women's Clothing"
              onChange={(e) =>
                dispatch({
                  type: "setCategories",
                  payload: e.target.value,
                  checked: e.target.checked,
                })
              }
              type="checkbox"
            />{" "}
            Women
          </li>
          <li className="category-list__item">
            <input
              checked={state.categories.includes("Jewellery")}
              value="Jewellery"
              onChange={(e) =>
                dispatch({
                  type: "setCategories",
                  payload: e.target.value,
                  checked: e.target.checked,
                })
              }
              type="checkbox"
            />{" "}
            Jewellery
          </li>
          <li className="category-list__item">
            <input
              checked={state.categories.includes("Electronics")}
              value="Electronics"
              onChange={(e) =>
                dispatch({
                  type: "setCategories",
                  payload: e.target.value,
                  checked: e.target.checked,
                })
              }
              type="checkbox"
            />{" "}
            Electronics
          </li>
        </ul>
      </div>

      <div className="filter-price">
        <h4> Ratings:</h4>
        <div className="flex-gap">
          <div className="price-range">
            <p>{state.rating} ⭐ and above</p>
          </div>
          <input
            className="slider"
            onChange={(e) =>
              dispatch({ type: "setRating", payload: e.target.value })
            }
            type="range"
            value={state.rating}
            min="0"
            max="5"
          />
        </div>
      </div>
    </aside>
  );
}
