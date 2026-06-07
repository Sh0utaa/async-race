/* eslint-disable no-param-reassign */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Engine, EngineStatus } from '../utils/types';
import { fetchCars, handleDeleteCar } from './garageSlice';

type EngineState = Record<number, Engine>;

const initialState: EngineState = {};

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
      });
  },
});

export const { initEngine, updateEngine } = engineSlice.actions;
export default engineSlice.reducer;
