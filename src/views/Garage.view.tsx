import RaceLaneComponent from '../components/RaceLane.component';
import useGarage from '../hooks/useGarage';
import CarCreationPanel from '../components/CarCreationPanel.component';
import CarUpdatePanel from '../components/CarUpdatePanel.component';
import PaginationComponent from '../components/Pagination.component';
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
        <CarCreationPanel />
        <CarUpdatePanel />
        <button type="button" className="garage-generate-btn">
          generate cars
        </button>
      </div>
      <div className="garage-lanes">
        {cars.map((car) => (
          <RaceLaneComponent key={car.id} car={car} />
        ))}
      </div>
      <PaginationComponent />
    </div>
  );
}
