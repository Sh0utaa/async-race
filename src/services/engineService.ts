import type { EngineData } from '../utils/types';
import { BASE_URL } from './apiConfig';

const ENGINE_URL = `${BASE_URL}/engine`;

export const startEngine = async (id: number): Promise<EngineData> => {
  const response = await fetch(`${ENGINE_URL}/?_id=${id}&?_status=started`);
  if (!response.ok) {
    throw new Error(`Failed to start engine. Status ${response.status}`);
  }

  return response.json();
};

export const stopEngine = async (id: number) => {
  const response = await fetch(`${ENGINE_URL}/?_id=${id}&?_status=started`);
  if (!response.ok) {
    throw new Error(`Failed to stop engine. Status ${response.status}`);
  }

  return response.json();
};
// export const drive = async (id: number) => {};
