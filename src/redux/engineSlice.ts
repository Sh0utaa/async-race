/* eslint-disable no-param-reassign */
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { Engine, EngineData, EngineStatus } from '../utils/types';
import { fetchCars, handleDeleteCar } from './garageSlice';
import { startEngine, stopEngine } from '../services/engineService';

type EngineState = Record<number, Engine>;

const initialState: EngineState = {};

export const handleEngineStart = createAsyncThunk(
  'engine/startEngine',
  async (id: number): Promise<EngineData> => {
    const data = await startEngine(id);
    return data;
  },
);

export const handleEngineStop = createAsyncThunk(
  'engine/stopEngine',
  async (id: number): Promise<EngineData> => {
    const data = await stopEngine(id);
    return data;
  },
);

const engineSlice = createSlice({
  name: 'engine',
  initialState,
  reducers: {
    initEngine: (state, action: PayloadAction<number>) => {
      state[action.payload] = {
        carId: action.payload,
        status: 'stopped',
        velocity: 0,
        distance: 0,
      };
    },
    updateEngine: (
      state,
      action: PayloadAction<{ id: number; status: EngineStatus }>,
    ) => {
      const { id, status } = action.payload;
      if (state[id] !== undefined) {
        state[id].status = status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.fulfilled, (state, action) => {
        action.payload.cars.forEach((car) => {
          if (state[car.id] === undefined)
            state[car.id] = {
              carId: car.id,
              status: 'stopped',
              velocity: 0,
              distance: 0,
            };
        });
      })
      .addCase(handleDeleteCar.fulfilled, (state, action) => {
        delete state[action.payload];
      })
      .addCase(
        handleEngineStart.fulfilled,
        (state, action: PayloadAction<EngineData>) => {
          const { carId, velocity, distance } = action.payload;

          if (state[carId] !== undefined) {
            state[carId].status = 'started';
            state[carId].velocity = velocity;
            state[carId].distance = distance;
          }
        },
      )
      .addCase(
        handleEngineStop.fulfilled,
        (state, action: PayloadAction<EngineData>) => {
          const { carId } = action.payload;

          if (state[carId] !== undefined) {
            state[carId].status = 'stopped';
            state[carId].velocity = 0;
            state[carId].distance = 0;
          }
        },
      );
  },
});

export const { initEngine, updateEngine } = engineSlice.actions;
export default engineSlice.reducer;
