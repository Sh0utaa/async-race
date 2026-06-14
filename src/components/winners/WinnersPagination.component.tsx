import ChevronBackwards from '../../assets/svg/chevron_backwards.svg?react';
import ChevronForwards from '../../assets/svg/chevron_forwards.svg?react';
import usePage from '../../hooks/usePages';
import useWinners from '../../hooks/useWinners';

export default function PaginationComponent() {
  const { totalCount } = useWinners();
  const { winnersPage, onWinnersPageDecrement, onWinnersPageIncrement } =
    usePage();

  return (
    <div className="pagination">
      <button type="button" onClick={onWinnersPageDecrement}>
        <ChevronBackwards fill="black" />
      </button>
      <p>page #{winnersPage}</p>
      <button type="button" onClick={onWinnersPageIncrement}>
        <ChevronForwards fill="black" />
      </button>
      <div className="garage-count">
        <p>Total Winners: ({totalCount})</p>
      </div>
    </div>
  );
}
