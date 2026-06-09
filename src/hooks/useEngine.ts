import {
  handleEngineDrive,
  handleEngineStart,
  handleEngineStop,
  updateEngine,
} from '../redux/engineSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import type { Car, EngineStatus } from '../utils/types';

export default function useEngine() {
  const dispatch = useAppDispatch();
  const engines = useAppSelector((state) => state.engine);

  const onEngineUpdate = (id: number, status: EngineStatus) => {
    dispatch(updateEngine({ id, status }));
  };

  const onEngineStart = async (id: number) => {
    await dispatch(handleEngineStart(id));
    dispatch(handleEngineDrive(id));
  };

  const onEngineStop = (id: number) => {
    dispatch(handleEngineStop(id)).unwrap();
  };

  const onEngineDrive = (id: number) => {
    dispatch(handleEngineDrive(id));
  };

  const raceAllCars = async (cars: Car[]) => {
    if (cars.length === 0) return;

    const carPromises = cars.map((car) => dispatch(handleEngineStart(car.id)));
    await Promise.all(carPromises);

    cars.forEach((car) => {
      dispatch(handleEngineDrive(car.id));
    });
  };

  const resetAllCars = async (cars: Car[]) => {
    if (cars.length === 0) return;

    const carPromises = cars.map((car) => dispatch(handleEngineStop(car.id)));
    await Promise.all(carPromises);
  };

  const getEngine = (carId: number) => engines[carId];
  return {
    engines,
    getEngine,
    onEngineUpdate,
    onEngineStart,
    onEngineStop,
    onEngineDrive,
    raceAllCars,
    resetAllCars,
  };
}
