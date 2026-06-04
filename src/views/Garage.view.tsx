import RaceLaneComponent from '../components/RaceLane.component';
import useGarage from '../hooks/useGarage';
import '../styles/garage.css';

export default function GarageView() {
  const { cars } = useGarage();
  return (
    <div className="garage">
      <div className="garage-controls">
        <div className="garage-race-actions">
          <button type="button">race</button>
          <button type="button">reset</button>
        </div>
        <div className="garage-create-form">
          <input type="text" name="crt-name" placeholder="brand" />
          <input type="color" name="crt-color" />
          <button type="button">create</button>
        </div>
        <div className="garage-update-form">
          <input type="text" name="upd-name" placeholder="brand" />
          <input type="color" name="updt-color" />
          <button type="button">update</button>
        </div>
        <button type="button" className="garage-generate-btn">
          generate cars
        </button>
      </div>
      <div className="garage-lanes">
        {cars.map((car) => (
          <RaceLaneComponent key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
}
