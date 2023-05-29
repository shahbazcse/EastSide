export default function FilterBar() {
  return (
    <div className="filterBar">
      <fieldset>
        <legend>Filters</legend>
        <strong>
          <p>Sort by Price:</p>
        </strong>
        <label>
          <input type="radio" /> price - Low-to-High
        </label>
        <label>
          <input type="radio" /> price - High-to-Low
        </label>

        <strong>
          <p> Categories:</p>
        </strong>
        <label>
          <input type="checkbox" /> Smartphones
        </label>
        <label>
          <input type="checkbox" /> Laptops
        </label>

        <strong>
          <p> Ratings:</p>
        </strong>
        <label>
          <p>0+ 1+ 2+ 3+ 4+ 5+</p>
          <input type="range" defaultValue="0" min="0" max="5" />
        </label>
      </fieldset>
    </div>
  );
}
