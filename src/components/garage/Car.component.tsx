import CarIcon from '../../assets/svg/car.svg?react';
import type { Car, Engine } from '../../utils/types';
import '../../styles/car.css';

interface CarComponentProps {
  car: Car;
  engine: Engine;
}

export default function CarComponent({ car, engine }: CarComponentProps) {
  const currentStatus = engine.status || 'stopped';
  const carClassName = `car-object ${currentStatus}`;

  return (
    <div
      className={carClassName.trim()}
      style={
        {
          '--race-duration': `${engine.duration}ms`,
        } as React.CSSProperties
      }
    >
      <CarIcon
        style={{
          width: '60px',
          height: 'auto',
          color: car.color,
          zIndex: 5,
        }}
      />
    </div>
  );
}
