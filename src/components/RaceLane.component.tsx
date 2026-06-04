import type { Car } from '../utils/types';
import '../styles/racelane.css';
import CarComponent from './Car.component';

interface RaceLaneProps {
  car: Car;
  onDelete: (id: number) => void;
}

export default function RaceLaneComponent({ car, onDelete }: RaceLaneProps) {
  return (
    <div className="race-lane">
      <div className="lane-meta-controls">
        <button type="button">select</button>
        <button type="button" onClick={() => onDelete(car.id)}>
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
