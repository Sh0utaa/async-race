import { useEffect } from 'react';
import {
  listOfCars,
  listOfColors,
  type Car,
  type CreateCarDto,
  type UpdateCarDto,
} from '../utils/types';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  fetchCars,
  handleCreateCar,
  handleDeleteCar,
  handleUpdateCar,
  setSelectedCar,
} from '../redux/garageSlice';
import usePage from './usePages';

export default function useGarage() {
  const dispatch = useAppDispatch();

  const { cars, selectedCar, totalCount } = useAppSelector(
    (state) => state.garage,
  );

  const { garagePage } = usePage();

  useEffect(() => {
    dispatch(fetchCars(garagePage));
  }, [dispatch, garagePage]);

  const onCreateCar = (car: CreateCarDto) => {
    if (car.name.trim().length === 0) return;
    dispatch(handleCreateCar(car));
  };

  const onDeleteCar = (id: number) => {
    dispatch(handleDeleteCar(id));
  };

  const onUpdateCar = (id: number, car: UpdateCarDto) => {
    if (car.name?.trim().length === 0) {
      dispatch(setSelectedCar(null));
      return;
    }
    dispatch(handleUpdateCar({ id, car }));
  };

  const onSelectCar = (car: Car | null) => {
    dispatch(setSelectedCar(car));
  };

  const generateCars = async () => {
    for (let i: number = 0; i < 100; i++) {
      const brand = listOfCars[Math.floor(Math.random() * listOfCars.length)]!;
      const color =
        listOfColors[Math.floor(Math.random() * listOfColors.length)]!;

      const car: CreateCarDto = {
        name: brand,
        color,
      };

      // eslint-disable-next-line no-await-in-loop
      await dispatch(handleCreateCar(car));
    }
  };

  return {
    cars,
    onCreateCar,
    onDeleteCar,
    onUpdateCar,
    onSelectCar,
    selectedCar,
    totalCount,
    generateCars,
  };
}
