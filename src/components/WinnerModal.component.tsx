import { useEffect, useState } from 'react';
import '../styles/winnerModal.css';
import useWinners from '../hooks/useWinners';
import useGarage from '../hooks/useGarage';

export default function WinnerModal() {
  const { raceWinner, winnersMap } = useWinners();
  const { cars } = useGarage();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (raceWinner !== undefined && raceWinner !== null) {
      setIsOpen(true);
    }
  }, [raceWinner]);

  if (!isOpen || raceWinner === undefined || raceWinner === null) {
    return null;
  }

  const currentCar = cars?.find((car) => car.id === raceWinner);

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button
          type="button"
          className="close-btn"
          onClick={() => setIsOpen(false)}
        >
          X
        </button>
        <h3>{currentCar?.name}</h3>
        <p>{winnersMap[raceWinner]?.time}</p>
      </div>
    </div>
  );
}
