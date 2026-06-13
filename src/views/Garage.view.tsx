import { useEffect } from 'react';
import RaceLaneComponent from '../components/garage/RaceLane.component';
import CarCreationPanel from '../components/garage/CarCreationPanel.component';
import CarUpdatePanel from '../components/garage/CarUpdatePanel.component';
import PaginationComponent from '../components/garage/Pagination.component';
import '../styles/garage.css';
import CarGenerationPanel from '../components/garage/CarGenerationPanel.component';
import usePage from '../hooks/usePages';
import useGarage from '../hooks/useGarage';
import useEngine from '../hooks/useEngine';
import CarRacePanel from '../components/garage/CarRacePanel';
import Navbar from '../components/Navbar.component';

export default function GarageView() {
  const { engines } = useEngine();
  const { cars, fetchGarageCars, carsUpdatedTrigger } = useGarage();
  const { garagePage } = usePage();

  useEffect(() => {
    const garageCarsPromise = fetchGarageCars(garagePage);

    return () => {
      garageCarsPromise.abort();
    };
  }, [fetchGarageCars, garagePage, carsUpdatedTrigger]);

  return (
    <div className="garage">
      <Navbar />
      <div className="garage-controls">
        <div className="garage-race-actions">
          <CarRacePanel />
        </div>
        <CarCreationPanel />
        <CarUpdatePanel />
        <CarGenerationPanel />
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
