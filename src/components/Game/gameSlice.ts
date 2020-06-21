import { createSlice } from '@reduxjs/toolkit';

import { RootState } from 'store';

type gameSliceState = {
  history: [
    {
      squares: Array<string>;
      lastSquare: [];
    },
  ];
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
  reducers: {},
});

export default gameSlice.reducer;

export const gameStateSelector = (state: RootState): gameSliceState => {
  return state.game;
};
