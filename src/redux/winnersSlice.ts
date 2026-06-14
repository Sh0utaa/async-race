/* eslint-disable no-param-reassign */
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from './store';
import {
  createWinner,
  deleteWinner,
  getWinnerById,
  getWinners,
  updateWinner,
} from '../services/winnersService';
import type { Winner, WinnersConfig, WinnersResponse } from '../utils/types';

interface WinnersState {
  winnersMap: Record<number, Winner>;
  leaderboard: Winner[];
  totalCount: number;
  raceWinner?: number;
  raceStarted: boolean;
  args: WinnersConfig;
}

const initialState: WinnersState = {
  winnersMap: {},
  leaderboard: [],
  totalCount: 0,
  raceWinner: undefined,
  raceStarted: false,
  args: {
    page: 1,
    limit: 10,
    sort: 'wins',
    order: 'ASC',
  },
};

export const fetchWinners = createAsyncThunk(
  'winners/fetchWinners',
  async (args: WinnersConfig): Promise<WinnersResponse> => {
    const data = await getWinners(args);
    return data;
  },
);

export const fetchWinnerById = createAsyncThunk(
  'winner/fetchWinnerById',
  async (id: number): Promise<Winner | null> => getWinnerById(id),
);

export const handleCreateWinner = createAsyncThunk<
  Winner,
  Winner,
  { state: RootState }
>('winners/createWinner', async (winner: Winner, { getState, dispatch }) => {
  const data = await createWinner(winner);

  const { args } = getState().winners;
  dispatch(fetchWinners(args));

  return data;
});

export const handleUpdateWinner = createAsyncThunk<
  Winner,
  Winner,
  { state: RootState }
>('winners/updateWinner', async (winner: Winner, { getState, dispatch }) => {
  const data = await updateWinner(winner);

  const { args } = getState().winners;
  dispatch(fetchWinners(args));

  return data;
});

export const handleDeleteWinner = createAsyncThunk<
  number,
  number,
  { state: RootState }
>('winners/deleteWinner', async (id: number, { getState, dispatch }) => {
  const state = getState();
  const winnerExists = state.winners.winnersMap[id] !== undefined;

  if (winnerExists) {
    await deleteWinner(id);

    const { args } = state.winners;
    dispatch(fetchWinners(args));
  }

  return id;
});

export const resolveWinner = createAsyncThunk<
  number,
  number,
  { state: RootState }
>('winners/resolveWinner', async (id: number, { getState, dispatch }) => {
  const state = getState();

  const currentEngine = state.engine[id]!;
  const currentWinner = state.winners.winnersMap[id];

  if (state.winners.raceWinner !== undefined) {
    return state.winners.raceWinner;
  }

  const finishTime = currentEngine.duration / 1000;

  if (currentWinner) {
    const updatedWinner: Winner = {
      id: currentWinner.id,
      wins: currentWinner.wins + 1,
      time: Math.min(currentWinner.time, finishTime),
    };

    dispatch(handleUpdateWinner(updatedWinner));
  } else {
    const newWinner: Winner = {
      id,
      wins: 1,
      time: finishTime,
    };

    dispatch(handleCreateWinner(newWinner));
  }

  return id;
});

const winnersSlice = createSlice({
  name: 'winners',
  initialState,
  reducers: {
    resetRaceWinner: (state) => {
      state.raceWinner = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchWinners.fulfilled,
        (state, action: PayloadAction<WinnersResponse>) => {
          const map: Record<number, Winner> = {};

          action.payload.winners.forEach((w) => {
            map[w.id] = w;
          });

          state.winnersMap = map;
          state.leaderboard = action.payload.winners;
          state.totalCount = action.payload.totalCount;
        },
      )
      .addCase(
        resolveWinner.fulfilled,
        (state, action: PayloadAction<number>) => {
          if (state.raceWinner === undefined) {
            state.raceWinner = action.payload;
          }
        },
      )
      .addCase(
        handleDeleteWinner.fulfilled,
        (state, action: PayloadAction<number>) => {
          const deletedId = action.payload;

          state.leaderboard = state.leaderboard.filter(
            (w) => w.id !== deletedId,
          );

          if (state.winnersMap[deletedId]) {
            delete state.winnersMap[deletedId];
          }
        },
      );
  },
});

export const { resetRaceWinner } = winnersSlice.actions;
export default winnersSlice.reducer;
