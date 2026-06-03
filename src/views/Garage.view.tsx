import RaceLaneComponent from '../components/RaceLane.component';
import useGarage from '../hooks/useGarage';

export default function GarageView() {
  const { cars } = useGarage();

  console.log(cars);
  return (
    <ul>
      {cars.map((car) => (
        <RaceLaneComponent key={car.id} car={car} />
      ))}
    </ul>
  );
}
