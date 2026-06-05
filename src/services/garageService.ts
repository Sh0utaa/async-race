import type {
  Car,
  CarsResponse,
  CreateCarDto,
  UpdateCarDto,
} from '../utils/types';
import { BASE_URL } from './apiConfig';

const GARAGE_URL = `${BASE_URL}/garage`;
const JSON_HEADERS = { 'Content-Type': 'application/json' };

export const getAllCars = async (page: number): Promise<CarsResponse> => {
  const response = await fetch(`${GARAGE_URL}/?_page=${page}&_limit=7`);
  if (!response.ok) {
    throw new Error(`Failed to fetch cars. Status ${response.status}`);
  }

  const cars = await response.json();
  const totalCount = Number(response.headers.get('X-Total-Count'));

  return {
    cars,
    totalCount,
  };
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
    headers: JSON_HEADERS,
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
    headers: JSON_HEADERS,
    body: JSON.stringify(car),
  });
  if (!response.ok) {
    throw new Error(`Failed to update car. Status: ${response.status}`);
  }
  return response.json() as Promise<Car>;
};

export const deleteCar = async (id: number): Promise<void> => {
  const response = await fetch(`${GARAGE_URL}/${id}`, {
    method: 'DELETE',
    headers: JSON_HEADERS,
  });
  if (!response.ok) {
    throw new Error(`Failed to delete car. Status: ${response.status}`);
  }
};
