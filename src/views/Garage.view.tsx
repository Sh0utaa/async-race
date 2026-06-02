import useGarage from '../hooks/useGarage';

export default function GarageView() {
  const { cars, handleDeleteCar } = useGarage();

  console.log(cars);
  return (
    <ul>
      {cars.map((car) => (
        <li key={car.id} style={{ color: car.color }}>
          {car.name}
          <button type="button" onClick={() => handleDeleteCar(car.id)}>
            delete
          </button>
        </li>
      ))}
    </ul>
  );
}
