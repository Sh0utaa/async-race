import useEngine from '../../hooks/useEngine';
import useGarage from '../../hooks/useGarage';

export default function GaragePanelComponent() {
  const { cars } = useGarage();
  const { raceAllCars, resetAllCars } = useEngine();

  return (
    <>
      <button type="button" onClick={() => raceAllCars(cars)}>
        race
      </button>
      <button type="button" onClick={() => resetAllCars(cars)}>
        reset
      </button>
    </>
  );
}
