import type { Car, Engine } from '../../utils/types';
import '../../styles/racelane.css';
import CarComponent from './Car.component';
import useGarage from '../../hooks/useGarage';
import useEngine from '../../hooks/useEngine';
import usePage from '../../hooks/usePages';

interface RaceLaneProps {
  car: Car;
  engine: Engine;
}

export default function RaceLaneComponent({ car, engine }: RaceLaneProps) {
  const { cars, onDeleteCar, onSelectCar, selectedCar } = useGarage();
  const { onEngineStart, onEngineStop, onEngineUpdate } = useEngine();
  const { garagePage, onGaragePageDecrement } = usePage();
  const isSelected = selectedCar?.id === car.id;

  const handleCarRemoval = async () => {
    const isLastCarOnPage = cars.length === 1;

    try {
      await onDeleteCar(car.id);

      if (isLastCarOnPage && garagePage > 1) {
        onGaragePageDecrement();
      }
    } catch (error) {
      console.error('Failed to accurately transition page rows:', error);
    }
  };

  if (!engine) return null;
  return (
    <div className="race-lane">
      <div className="lane-meta-controls">
        <button
          type="button"
          onClick={() => {
            if (isSelected) {
              onSelectCar(null);
            } else {
              onSelectCar(car);
            }
          }}
        >
          {isSelected ? 'deselect' : 'select'}
        </button>
        <button type="button" onClick={handleCarRemoval}>
          remove
        </button>
      </div>
      <div className="lane-race-controls">
        <button
          type="button"
          onClick={() => {
            onEngineUpdate(car.id, 'pending');
            onEngineStart(car.id);
          }}
          disabled={engine.status !== 'stopped'}
        >
          A
        </button>
        <button
          type="button"
          onClick={() => {
            onEngineUpdate(car.id, 'stopped');
            onEngineStop(car.id);
          }}
          disabled={engine.status === 'stopped'}
        >
          B
        </button>
      </div>
      <div className="track-container">
        <div className="lane-track">
          <div className="car-wrapper">
            <span className="car-name">{car.name}</span>
            <div className="">
              <CarComponent car={car} engine={engine} />
            </div>
          </div>
          {/* <div className="engine">
            <ul>
              <li>carId: {engine.carId}</li>
              <li>Status: {engine.status}</li>
              <li>Velocity: {engine.velocity}</li>
              <li>Distance: {engine.distance}</li>
              <li>Duration: {engine.duration}</li>
            </ul>
          </div> */}
        </div>
        <div className="finish-lane" />
      </div>
    </div>
  );
}
