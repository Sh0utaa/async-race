import { useEffect, useState } from 'react';
import type { Car } from '../utils/types';
import { deleteCar, getAllCars } from '../services/garageService';

export default function useGarage() {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    const fetchAllCars = async (): Promise<void> => {
      const data = await getAllCars();
      setCars(data);
    };

    fetchAllCars();
  }, []);

  const handleDeleteCar = async (id: number): Promise<void> => {
    try {
      await deleteCar(id);

      setCars((prevCars) => prevCars.filter((car) => car.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return { cars, handleDeleteCar };
}
