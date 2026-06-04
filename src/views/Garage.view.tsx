import CreateCarComponent from '../components/CreateCarForm.component';
import RaceLaneComponent from '../components/RaceLane.component';
import useGarage from '../hooks/useGarage';
import '../styles/garage.css';

export default function GarageView() {
  const { cars, handleDeleteCar, handleCreateCar } = useGarage();
  return (
    <div className="garage">
      <div className="garage-controls">
        <div className="garage-race-actions">
          <button type="button">race</button>
          <button type="button">reset</button>
        </div>
        <CreateCarComponent onCreate={handleCreateCar} />
        <div className="garage-update-form">
          <input type="text" name="upd-name" placeholder="brand" />
          <input type="color" name="upd-color" />
          <button type="button">update</button>
        </div>
        <button type="button" className="garage-generate-btn">
          generate cars
        </button>
      </div>
      <div className="garage-lanes">
        {cars.map((car) => (
          <RaceLaneComponent
            key={car.id}
            car={car}
            onDelete={handleDeleteCar}
          />
        ))}
      </div>
    </div>
  );
}
