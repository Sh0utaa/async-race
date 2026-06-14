import ChevronBackwards from '../../assets/svg/chevron_backwards.svg?react';
import ChevronForwards from '../../assets/svg/chevron_forwards.svg?react';
import useGarage from '../../hooks/useGarage';
import usePage from '../../hooks/usePages';
import useWinners from '../../hooks/useWinners';

export default function PaginationComponent() {
  const { totalCount } = useGarage();
  const { garagePage, onGaragePageIncrement, onGaragePageDecrement } =
    usePage();

  const { raceWinner } = useWinners();

  return (
    <div className="pagination">
      <button type="button" onClick={onGaragePageDecrement}>
        <ChevronBackwards fill="black" />
      </button>
      <p>page #{garagePage}</p>
      <button type="button" onClick={onGaragePageIncrement}>
        <ChevronForwards fill="black" />
      </button>
      <h3>current winner {raceWinner} </h3>
      <div className="garage-count">
        <p>GARAGE ({totalCount})</p>
      </div>
    </div>
  );
}
