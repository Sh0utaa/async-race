import type { Car } from '../utils/types';
import { BASE_URL } from './apiConfig';

const GARAGE_URL = `${BASE_URL}/garage`;

export const getAllCars = async (): Promise<Car[]> => {
  const response = await fetch(`${GARAGE_URL}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch cars. Status ${response.status}`);
  }
  return response.json() as Promise<Car[]>;
};

export const getCarById = async (id: number): Promise<Car> => {
  const response = await fetch(`${GARAGE_URL}/${id}`);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch car with id ${id}. Status ${response.status}`,
    );
  }
  return response.json() as Promise<Car>;
};
