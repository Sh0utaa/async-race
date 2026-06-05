/* eslint-disable no-param-reassign */
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { Car, CreateCarDto, UpdateCarDto } from '../utils/types';
import {
  createCar,
  getAllCars,
  deleteCar,
  updateCar,
} from '../services/garageService';

interface GarageState {
  cars: Car[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  selectedCar: Car | null;
  error: string | null;
}

const initialState: GarageState = {
  cars: [],
  status: 'idle',
  selectedCar: null,
  error: null,
};

export const fetchCars = createAsyncThunk('garage/fetchCars', async () => {
  const data = await getAllCars();
  return data;
});

export const handleCreateCar = createAsyncThunk(
  'garage/createCar',
  async (car: CreateCarDto) => {
    const data = await createCar(car);
    return data;
  },
);

export const handleDeleteCar = createAsyncThunk(
  'garage/deleteCar',
  async (id: number) => {
    await deleteCar(id);
    return id;
  },
);

export const handleUpdateCar = createAsyncThunk(
  'garage/updateCar',
  async ({ id, car }: { id: number; car: UpdateCarDto }) => {
    const data = await updateCar(id, car);
    return data;
  },
);

const garageSlice = createSlice({
  name: 'garage',
  initialState,
  reducers: {
    setSelectedCar: (state, action: PayloadAction<Car | null>) => {
      state.selectedCar = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCars.fulfilled, (state, action: PayloadAction<Car[]>) => {
        state.status = 'succeeded';
        state.cars = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch cars';
      })
      .addCase(
        handleCreateCar.fulfilled,
        (state, action: PayloadAction<Car>) => {
          state.cars.push(action.payload);
        },
      )
      .addCase(
        handleDeleteCar.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.cars = state.cars.filter((car) => car.id !== action.payload);
        },
      )
      .addCase(
        handleUpdateCar.fulfilled,
        (state, action: PayloadAction<Car>) => {
          const updatedCar = action.payload;

          state.cars = state.cars.map((car) =>
            car.id === updatedCar.id ? updatedCar : car,
          );

          state.selectedCar = null;
        },
      );
  },
});

export const { setSelectedCar } = garageSlice.actions;
export default garageSlice.reducer;
