import { createSlice, createSelector } from '@reduxjs/toolkit';

import { RootState } from 'store';
import calculateWinner from 'services/calculateWinner';

export type historyType = {
  squares: Array<string>;
  lastSquare: Array<number>;
};
type gameSliceState = {
  history: historyType[];
  stepNumber: number;
  xIsNext: boolean;
  ascending: boolean;
};

const initialState: gameSliceState = {
  history: [
    {
      squares: Array(9).fill(null),
      lastSquare: [],
    },
  ],
  stepNumber: 0,
  xIsNext: true,
  ascending: false,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    selectSquare(state, action) {
      const { squares, lastSquare, currentHistory } = action.payload;
      state.history = currentHistory.concat([{ squares, lastSquare }]);
      state.stepNumber = currentHistory.length;
      state.xIsNext = !state.xIsNext;
    },
    selectHistory(state, action) {
      const step = action.payload;
      const xIsNext = step % 2 === 0;
      state.stepNumber = step;
      state.xIsNext = xIsNext;
    },
    setSort(state) {
      state.ascending = !state.ascending;
    },
  },
});

export const { selectSquare, selectHistory, setSort } = gameSlice.actions;
export default gameSlice.reducer;

export const gameStateSelector = (state: RootState): gameSliceState => {
  return state.game;
};

export const historySelector = createSelector(gameStateSelector, (game) => game.history);
export const stepNumberSelector = createSelector(gameStateSelector, (game) => game.stepNumber);
export const xIsNextSelector = createSelector(gameStateSelector, (game) => game.xIsNext);
export const ascendingSelector = createSelector(gameStateSelector, (game) => game.ascending);
export const winnerSelector = createSelector(historySelector, stepNumberSelector, (history, stepNumber) => {
  const { squares } = history[stepNumber];
  const winner = calculateWinner(squares);
  return winner;
});
