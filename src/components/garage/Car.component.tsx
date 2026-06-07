import CarIcon from '../../assets/svg/car.svg?react';
import type { Car, Engine } from '../../utils/types';
import '../../styles/car.css';

interface CarComponentProps {
  car: Car;
  engine: Engine;
}

export default function CarComponent({ car, engine }: CarComponentProps) {
  const carClassName = `car-object ${engine.status === 'started' ? 'animate' : ''}`;

  return (
    <div
      className={carClassName.trim()}
      style={
        {
          '--race-duration': `${engine.duration}ms`,
        } as React.CSSProperties
      }
    >
      <CarIcon style={{ width: '60px', height: 'auto', color: car.color }} />
    </div>
  );
}
