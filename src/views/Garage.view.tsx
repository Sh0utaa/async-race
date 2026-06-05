import RaceLaneComponent from '../components/garage/RaceLane.component';
import useGarage from '../hooks/useGarage';
import CarCreationPanel from '../components/garage/CarCreationPanel.component';
import CarUpdatePanel from '../components/garage/CarUpdatePanel.component';
import PaginationComponent from '../components/garage/Pagination.component';
import '../styles/garage.css';
import RaceControlPanel from '../components/garage/RaceControlPanel.component';

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
        <RaceControlPanel />
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
