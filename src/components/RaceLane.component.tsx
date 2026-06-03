import type { Car } from '../utils/types';
import '../styles/racelane.css';
import CarIcon from '../assets/svg/car-side-svgrepo-com.svg?react';

interface RaceLaneProps {
  car: Car;
}

export default function RaceLaneComponent({ car }: RaceLaneProps) {
  return (
    <div className="race-lane">
      <div className="customise">
        <button>select</button>
        <button>remove</button>
      </div>
      <CarIcon className="car-graphic" stroke={car.color} />
      <div className="actions">
        <button>race</button>
        <button>stop</button>
      </div>
    </div>
  );
}
