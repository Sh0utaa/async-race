import CarIcon from '../../assets/svg/car.svg?react';
import type { Car } from '../../utils/types';

interface CarComponentProps {
  car: Car;
}

export default function CarComponent({ car }: CarComponentProps) {
  return (
    <div>
      <CarIcon style={{ width: '60px', height: 'auto', color: car.color }} />
    </div>
  );
}
