import { useState } from 'react';
import useEngine from '../../hooks/useEngine';
import type { Car } from '../../utils/types';

interface GaragePanelProps {
  cars: Car[];
}

export default function GaragePanelComponent({ cars }: GaragePanelProps) {
  const { onEngineStart, onEngineStop } = useEngine();
  const [isRacing, setIsRacing] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const raceAllCars = async () => {
    if (cars.length === 0) return;
    setIsRacing(true);

    try {
      const racePromises = cars.map((car) => onEngineStart(car.id));
      await Promise.all(racePromises);

      console.log('All cars have started their engines!');
    } catch (error) {
      console.error('engine(s) failed to start: ', error);
    } finally {
      setIsRacing(false);
    }
  };

  const resetAllCars = async () => {
    if (cars.length === 0) return;
    setIsResetting(true);

    try {
      const resetPromises = cars.map((car) => onEngineStop(car.id));
      await Promise.all(resetPromises);
    } catch (error) {
      console.error('engine(s) failed to stop: ', error);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <>
      <button type="button" disabled={isRacing} onClick={raceAllCars}>
        {isRacing ? 'starting...' : 'race'}
      </button>
      <button type="button" disabled={isResetting} onClick={resetAllCars}>
        {isResetting ? 'resetting...' : 'reset'}
      </button>
    </>
  );
}
