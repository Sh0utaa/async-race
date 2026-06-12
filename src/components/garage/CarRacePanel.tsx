import useEngine from '../../hooks/useEngine';
import useGarage from '../../hooks/useGarage';

export default function CarRacePanel() {
  const { cars } = useGarage();
  const { raceAllCars, resetAllCars, isRacing } = useEngine();

  return (
    <>
      <button
        type="button"
        onClick={() => raceAllCars(cars)}
        disabled={isRacing}
      >
        race
      </button>
      <button type="button" onClick={() => resetAllCars(cars)}>
        reset
      </button>
    </>
  );
}
