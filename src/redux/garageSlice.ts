/* eslint-disable no-param-reassign */
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import {
  listOfCars,
  listOfColors,
  type Car,
  type CarsResponse,
  type CreateCarDto,
  type UpdateCarDto,
} from '../utils/types';
import {
  createCar,
  getCarsByPage,
  deleteCar,
  updateCar,
  getAllCars,
} from '../services/garageService';

interface GarageState {
  cars: Car[];
  allCars: Car[];
  totalCount: number;
  selectedCar: Car | null;
  error: string | null;
  carsUpdatedTrigger: boolean;
}

const initialState: GarageState = {
  cars: [],
  allCars: [],
  totalCount: 0,
  selectedCar: null,
  error: null,
  carsUpdatedTrigger: false,
};

export const fetchAllCars = createAsyncThunk(
  `garage/fetchAllCars`,
  async () => {
    const data = await getAllCars();
    return data;
  },
);

export const fetchCars = createAsyncThunk(
  'garage/fetchCars',
  async (page: number) => {
    const data = await getCarsByPage(page);
    return data;
  },
);

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

export const handleGenerateCars = createAsyncThunk(
  'garage/generateCars',
  async () => {
    const promises = [];

    for (let i = 0; i < 100; i++) {
      const brand = listOfCars[Math.floor(Math.random() * listOfCars.length)]!;
      const color =
        listOfColors[Math.floor(Math.random() * listOfColors.length)]!;

      const car: CreateCarDto = {
        name: brand,
        color,
      };

      promises.push(createCar(car));
    }

    try {
      await Promise.all(promises);
      console.log('Successfully generated 100 random cars concurrently!');
    } catch (error) {
      console.error('Something went wrong generating the batch:', error);
    }
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
      .addCase(fetchCars.pending, () => {})
      .addCase(
        fetchCars.fulfilled,
        (state, action: PayloadAction<CarsResponse>) => {
          state.cars = action.payload.cars;
          state.totalCount = action.payload.totalCount;
        },
      )
      .addCase(fetchCars.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch cars';
      })
      .addCase(
        handleUpdateCar.fulfilled,
        (state, action: PayloadAction<Car>) => {
          const updatedCar = action.payload;

          state.cars = state.cars.map((car) =>
            car.id === updatedCar.id ? updatedCar : car,
          );

          state.selectedCar = null;
        },
      )
      .addCase(handleGenerateCars.fulfilled, (state) => {
        state.carsUpdatedTrigger = !state.carsUpdatedTrigger;
      })
      .addCase(fetchAllCars.fulfilled, (state, action) => {
        state.allCars = action.payload.cars;
      });
  },
});

export const { setSelectedCar } = garageSlice.actions;
export default garageSlice.reducer;
