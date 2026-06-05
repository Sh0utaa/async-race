import { useEffect } from 'react';
import type { Car, CreateCarDto, UpdateCarDto } from '../utils/types';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  fetchCars,
  handleCreateCar,
  handleDeleteCar,
  handleUpdateCar,
  setSelectedCar,
} from '../redux/garageSlice';

export default function useGarage() {
  const dispatch = useAppDispatch();

  const { cars, selectedCar } = useAppSelector((state) => state.garage);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const onCreateCar = (car: CreateCarDto) => {
    dispatch(handleCreateCar(car));
  };

  const onDeleteCar = (id: number) => {
    dispatch(handleDeleteCar(id));
  };

  const onUpdateCar = (id: number, car: UpdateCarDto) => {
    dispatch(handleUpdateCar({ id, car }));
  };

  const onSelectCar = (car: Car | null) => {
    dispatch(setSelectedCar(car));
  };

  return {
    cars,
    onCreateCar,
    onDeleteCar,
    onUpdateCar,
    onSelectCar,
    selectedCar,
  };
}
