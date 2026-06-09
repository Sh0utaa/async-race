import {
  handleEngineDrive,
  handleEngineStart,
  handleEngineStop,
  updateEngine,
} from '../redux/engineSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import type { EngineStatus } from '../utils/types';

export default function useEngine() {
  const dispatch = useAppDispatch();
  const engines = useAppSelector((state) => state.engine);

  const onEngineUpdate = (id: number, status: EngineStatus) => {
    dispatch(updateEngine({ id, status }));
  };

  const onEngineStart = (id: number) => {
    dispatch(handleEngineStart(id)).unwrap();
  };

  const onEngineStop = (id: number) => {
    dispatch(handleEngineStop(id)).unwrap();
  };

  const onEngineDrive = (id: number) => {
    dispatch(handleEngineDrive(id));
  };

  const getEngine = (carId: number) => engines[carId];
  return {
    engines,
    getEngine,
    onEngineUpdate,
    onEngineStart,
    onEngineStop,
    onEngineDrive,
  };
}
