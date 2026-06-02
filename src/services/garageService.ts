import type { Car, CreateCarDto, UpdateCarDto } from '../utils/types';
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

export const createCar = async (car: CreateCarDto): Promise<Car> => {
  const response = await fetch(GARAGE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car),
  });
  if (!response.ok) {
    throw new Error(`Failed to create car. Status: ${response.status}`);
  }
  return response.json() as Promise<Car>;
};

export const updateCar = async (
  id: number,
  car: UpdateCarDto,
): Promise<Car> => {
  const response = await fetch(`${GARAGE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car),
  });
  if (!response.ok) {
    throw new Error(`Failed to update car. Status: ${response.status}`);
  }
  return response.json() as Promise<Car>;
};
