import type { Car } from '../utils/types';
import '../styles/racelane.css';
import CarComponent from './Car.component';
import useGarage from '../hooks/useGarage';

interface RaceLaneProps {
  car: Car;
}

export default function RaceLaneComponent({ car }: RaceLaneProps) {
  const { onDeleteCar, onSelectCar, selectedCar } = useGarage();
  const isSelected = selectedCar?.id === car.id;

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
        <button type="button" onClick={() => onDeleteCar(car.id)}>
          remove
        </button>
      </div>
      <div className="lane-race-controls">
        <button type="button">A</button>
        <button type="button">B</button>
      </div>
      <div className="lane-track">
        <div className="car-wrapper">
          <span className="car-name">{car.name}</span>
          <CarComponent car={car} />
        </div>
      </div>
    </div>
  );
}
