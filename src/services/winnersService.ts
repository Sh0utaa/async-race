import type {
  UpdateWinnerDto,
  Winner,
  WinnersConfig,
  WinnersResponse,
} from '../utils/types';
import { BASE_URL } from './apiConfig';

const WINNERS_URL = `${BASE_URL}/winners`;
const JSON_HEADERS = { 'Content-Type': 'application/json' };

export const getWinners = async (
  args: WinnersConfig,
): Promise<WinnersResponse> => {
  const response = await fetch(
    `${WINNERS_URL}/?_page=${args.page}&_limit=${args.limit}&_sort=${args.sort}&_order=${args.order}`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch winners. Status ${response.status}`);
  }

  const winners = await response.json();
  const totalCount = Number(response.headers.get('X-Total-Count'));

  return {
    winners,
    totalCount,
  };
};

export const createWinner = async (winner: Winner) => {
  const response = await fetch(WINNERS_URL, {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify(winner),
  });

  if (!response.ok) {
    throw new Error(`Failed to create winners. Status: ${response.status}`);
  }

  return response.json() as Promise<Winner>;
};

export const getWinnerById = async (id: number): Promise<Winner | null> => {
  const response = await fetch(`${WINNERS_URL}/${id}`);

  if (response.status === 404) return null;

  if (!response.ok) {
    throw new Error(`Failed to create a winner. Status: ${response.status}`);
  }

  return response.json() as Promise<Winner>;
};

export const updateWinner = async (winner: Winner) => {
  const dto: UpdateWinnerDto = {
    wins: winner.wins,
    time: winner.time,
  };

  const response = await fetch(`${WINNERS_URL}/${winner.id}`, {
    method: 'PUT',
    headers: JSON_HEADERS,
    body: JSON.stringify(dto),
  });

  if (!response.ok) {
    throw new Error(`Failed to update winner. Status ${response.status}`);
  }

  return response.json() as Promise<Winner>;
};

export const deleteWinner = async (id: number) => {
  const response = await fetch(`${WINNERS_URL}/${id}`, {
    method: 'POST',
    headers: JSON_HEADERS,
  });
  if (!response.ok) {
    throw new Error(`Failed to delete winner. Status: ${response.status}`);
  }
};
