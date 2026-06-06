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

  // useEffect(() => {
  //   const promise = dispatch(fetchCars(garagePage));

  //   return () => {
  //     promise.abort();
  //   };
  // }, [dispatch, garagePage]);

  const onCreateCar = async (car: CreateCarDto) => {
    if (car.name.trim().length === 0) return;
    await dispatch(handleCreateCar(car));
    dispatch(fetchCars(garagePage));
  };

  const onDeleteCar = async (id: number) => {
    await dispatch(handleDeleteCar(id)).unwrap();
    dispatch(fetchCars(garagePage));
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
      await onCreateCar(car);
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
