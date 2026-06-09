import useEngine from '../../hooks/useEngine';
import type { Car } from '../../utils/types';

interface GaragePanelProps {
  cars: Car[];
}

export default function GaragePanelComponent({ cars }: GaragePanelProps) {
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
