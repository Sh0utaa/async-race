import { useState } from 'react';
import CreateCarComponent from '../components/CreateCarForm.component';
import RaceLaneComponent from '../components/RaceLane.component';
import useGarage from '../hooks/useGarage';
import ChevronBackwards from '../assets/svg/chevron_backwards.svg?react';
import ChevronForwards from '../assets/svg/chevron_forwards.svg?react';
import '../styles/garage.css';
import UpdateCarComponent from '../components/UpdateCarForm.component';

export default function GarageView() {
  const { cars } = useGarage();
  const [page, setPage] = useState(1);

  return (
    <div className="garage">
      <div className="garage-controls">
        <div className="garage-race-actions">
          <button type="button">race</button>
          <button type="button">reset</button>
        </div>
        <CreateCarComponent />
        <UpdateCarComponent />
        <button type="button" className="garage-generate-btn">
          generate cars
        </button>
      </div>
      <div className="garage-lanes">
        {cars.map((car) => (
          <RaceLaneComponent key={car.id} car={car} />
        ))}
      </div>
      <div className="pagination">
        <button type="button" onClick={() => setPage(page - 1)}>
          <ChevronBackwards fill="black" />
        </button>
        <p>page {page}</p>
        <button type="button" onClick={() => setPage(page + 1)}>
          <ChevronForwards fill="black" />
        </button>
      </div>
    </div>
  );
}
