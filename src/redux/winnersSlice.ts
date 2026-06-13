/* eslint-disable no-param-reassign */
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import {
  createWinner,
  getWinners,
  updateWinner,
} from '../services/winnersService';
import type { Winner, WinnersConfig, WinnersResponse } from '../utils/types';

interface WinnersState {
  winners: Winner[];
  totalCount: number;
  currentWinner?: Winner;
  raceStarted: boolean;
  args: WinnersConfig;
}

const initialState: WinnersState = {
  winners: [],
  totalCount: 0,
  currentWinner: undefined,
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

export const handleCreateWinner = createAsyncThunk(
  'winners/createWinner',
  async (winner: Winner) => {
    const data = await createWinner(winner);
    return data;
  },
);

export const handleUpdateWinner = createAsyncThunk(
  'winners/updateWinner',
  async (winner: Winner) => {
    const data = await updateWinner(winner);
    return data;
  },
);

const winnersSlice = createSlice({
  name: 'winners',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchWinners.fulfilled,
        (state, action: PayloadAction<WinnersResponse>) => {
          state.winners = action.payload.winners;
          state.totalCount = action.payload.totalCount;
        },
      )
      .addCase(handleCreateWinner.fulfilled, (state, action) => {
        state.currentWinner = action.payload;
      })
      .addCase(handleUpdateWinner.fulfilled, (state, action) => {
        const updatedWinner = action.payload;

        state.winners = state.winners.map((winner) =>
          winner.id === updatedWinner.id ? updatedWinner : winner,
        );
      });
  },
});

// export const {} = winnersSlice.actions;
export default winnersSlice.reducer;
