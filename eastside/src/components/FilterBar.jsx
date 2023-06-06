import { useContext } from "react";
import { FilterContext } from "../contexts/FilterContext";

export default function FilterBar() {
  const { state, dispatch } = useContext(FilterContext);

  return (
    <div className="filterBar">
      <fieldset>
        <legend>Filters</legend>
        <button onClick={() => dispatch({ type: "clearFilters" })}>
          Clear Filters
        </button>
        <strong>
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
        </strong>
        <strong>
          <p>Sort by Price:</p>
        </strong>
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

        <strong>
          <p> Categories:</p>
        </strong>
        <label>
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
        </label>
        <label>
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
        </label>
        <label>
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
        </label>
        <label>
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
        </label>

        <strong>
          <p> Ratings:</p>
        </strong>
        <label>
          <p>0+ 1+ 2+ 3+ 4+ 5+</p>
          <input
            onChange={(e) =>
              dispatch({ type: "setRating", payload: e.target.value })
            }
            type="range"
            value={state.rating}
            min="0"
            max="5"
          />
        </label>
      </fieldset>
    </div>
  );
}
