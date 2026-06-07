import { useEffect } from 'react';
import RaceLaneComponent from '../components/garage/RaceLane.component';
import CarCreationPanel from '../components/garage/CarCreationPanel.component';
import CarUpdatePanel from '../components/garage/CarUpdatePanel.component';
import PaginationComponent from '../components/garage/Pagination.component';
import '../styles/garage.css';
import RaceControlPanel from '../components/garage/RaceControlPanel.component';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import usePage from '../hooks/usePages';
import { fetchCars } from '../redux/garageSlice';

export default function GarageView() {
  const dispatch = useAppDispatch();

  const { cars } = useAppSelector((state) => state.garage);
  const engines = useAppSelector((state) => state.engine);

  const { garagePage } = usePage();

  useEffect(() => {
    const promise = dispatch(fetchCars(garagePage));

    return () => {
      promise.abort();
    };
  }, [dispatch, garagePage]);

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
