/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

interface PaginationState {
  garagePage: number;
  winnersPage: number;
}

const initialState: PaginationState = {
  garagePage: 1,
  winnersPage: 1,
};

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    incrementGaragePage: (state) => {
      state.garagePage += 1;
    },
    decrementGaragePage: (state) => {
      if (state.garagePage === 1) return;
      state.garagePage -= 1;
    },
    incrementWinnersPage: (state) => {
      state.winnersPage += 1;
    },
    decrementWinnersPage: (state) => {
      state.winnersPage -= 1;
    },
  },
});

export const {
  incrementGaragePage,
  decrementGaragePage,
  incrementWinnersPage,
  decrementWinnersPage,
} = pageSlice.actions;
export default pageSlice.reducer;
