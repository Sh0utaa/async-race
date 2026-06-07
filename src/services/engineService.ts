import type { EngineData } from '../utils/types';
import { BASE_URL } from './apiConfig';

const ENGINE_URL = `${BASE_URL}/engine`;

export const startEngine = async (id: number): Promise<EngineData> => {
  const response = await fetch(`${ENGINE_URL}/?id=${id}&status=started`, {
    method: 'PATCH',
  });
  if (!response.ok) {
    throw new Error(`Failed to start engine. Status ${response.status}`);
  }

  const data = await response.json();
  return {
    carId: id,
    velocity: data.velocity,
    distance: data.distance,
  };
};

export const stopEngine = async (id: number): Promise<EngineData> => {
  const response = await fetch(`${ENGINE_URL}/?id=${id}&status=stopped`, {
    method: 'PATCH',
  });
  if (!response.ok) {
    throw new Error(`Failed to stop engine. Status ${response.status}`);
  }

  const data = await response.json();

  return {
    carId: id,
    velocity: data.velocity,
    distance: data.distance,
  };
};
