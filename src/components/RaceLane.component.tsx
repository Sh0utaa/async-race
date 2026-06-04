import type { Car } from '../utils/types';
import '../styles/racelane.css';
import CarComponent from './Car.component';

interface RaceLaneProps {
  car: Car;
}

export default function RaceLaneComponent({ car }: RaceLaneProps) {
  return (
    <div className="race-lane">
      <div className="lane-meta-controls">
        <button type="button">select</button>
        <button type="button">remove</button>
      </div>
      <div className="lane-race-controls">
        <button type="button">A</button>
        <button type="button">B</button>
      </div>
      <div className="lane-track">
        <CarComponent car={car} />
      </div>
    </div>
  );
}
