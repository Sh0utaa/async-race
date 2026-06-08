import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import RaceLaneComponent from '../components/garage/RaceLane.component';
import CarCreationPanel from '../components/garage/CarCreationPanel.component';
import CarUpdatePanel from '../components/garage/CarUpdatePanel.component';
import PaginationComponent from '../components/garage/Pagination.component';
import '../styles/garage.css';
import RaceControlPanel from '../components/garage/RaceControlPanel.component';
import usePage from '../hooks/usePages';
import useGarage from '../hooks/useGarage';
import useEngine from '../hooks/useEngine';
import GaragePanelComponent from '../components/garage/GaragePanel.component';

export default function GarageView() {
  const { engines } = useEngine();
  const { cars, fetchGarageCars } = useGarage();
  const { garagePage } = usePage();

  useEffect(() => {
    const promise = fetchGarageCars(garagePage);

    return () => {
      promise.abort();
    };
  }, [fetchGarageCars, garagePage]);

  return (
    <div className="garage">
      <nav>
        <Link to="/winners">Winners</Link>
        <br />
        <Link to="/garage">Garage</Link>
      </nav>
      <div className="garage-controls">
        <div className="garage-race-actions">
          <GaragePanelComponent cars={cars} />
        </div>
        <CarCreationPanel />
        <CarUpdatePanel />
        <RaceControlPanel />
      </div>
      <div className="garage-lanes">
        {cars.map((car) => {
          const engine = engines[car.id];
          if (!engine) return null;
          return <RaceLaneComponent key={car.id} car={car} engine={engine} />;
        })}
      </div>
      <PaginationComponent />
    </div>
  );
}
