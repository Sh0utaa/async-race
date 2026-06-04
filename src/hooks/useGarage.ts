import { useEffect, useState } from 'react';
import type { Car, CreateCarDto } from '../utils/types';
import { createCar, deleteCar, getAllCars } from '../services/garageService';

export default function useGarage() {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    const fetchAllCars = async (): Promise<void> => {
      const data = await getAllCars();
      setCars(data);
    };

    fetchAllCars();
  }, []);

  const handleCreateCar = async (car: CreateCarDto): Promise<void> => {
    try {
      const newCar = await createCar(car);

      setCars((prev) => [...prev, newCar]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCar = async (id: number): Promise<void> => {
    try {
      await deleteCar(id);

      setCars((prevCars) => prevCars.filter((car) => car.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return { cars, handleDeleteCar, handleCreateCar };
}
