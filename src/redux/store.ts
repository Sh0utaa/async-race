import { configureStore } from '@reduxjs/toolkit';
import garageReducer from './garageSlice';
import pageReducer from './pageSlice';
import engineReducer from './engineSlice';

export const store = configureStore({
  reducer: { garage: garageReducer, page: pageReducer, engine: engineReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
