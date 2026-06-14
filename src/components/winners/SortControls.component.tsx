export type SortBy = 'wins' | 'time';
export type SortOrder = 'ASC' | 'DESC';

interface WinnersSortProps {
  sort: SortBy;
  order: SortOrder;
  onSortChange: (sort: SortBy) => void;
  onOrderChange: (order: SortOrder) => void;
}

export default function SortControls({
  sort,
  order,
  onSortChange,
  onOrderChange,
}: WinnersSortProps) {
  return (
    <div className="winners__sort-container">
      <div className="winners__sort-group">
        {/* Nesting the select inside the label satisfies strict ESLint rules */}
        <label htmlFor="sort-by" className="winners__sort-label">
          Sort by
          <select
            id="sort-by"
            className="winners__sort-select"
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortBy)}
          >
            <option value="wins">Wins</option>
            <option value="time">Best Time</option>
          </select>
        </label>
      </div>

      <div className="winners__sort-group">
        <label htmlFor="sort-order" className="winners__sort-label">
          Order
          <select
            id="sort-order"
            className="winners__sort-select"
            value={order}
            onChange={(e) => onOrderChange(e.target.value as SortOrder)}
          >
            <option value="ASC">Ascending</option>
            <option value="DESC">Descending</option>
          </select>
        </label>
      </div>
    </div>
  );
}
