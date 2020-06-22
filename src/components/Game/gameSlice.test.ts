import gameSlice, {
  //   historySelector,
  //   stepNumberSelector,
  //   xIsNextSelector,
  //   ascendingSelector,
  //   winnerSelector,
  selectSquare,
  setSort,
  selectHistory,
  initialState,
} from './gameSlice';

describe('gameSlice reducer', () => {
  it('should select the square on selectSquare', () => {
    expect(
      gameSlice(
        initialState,
        selectSquare({
          squares: ['X'],
          lastSquare: [0],
          currentHistory: [],
        }),
      ),
    ).toStrictEqual({
      ...initialState,
      history: [
        {
          lastSquare: [0],
          squares: ['X'],
        },
      ],
      xIsNext: false,
    });
  });

  it('should select the step on selectHistory', () => {
    expect(gameSlice(initialState, selectHistory(4))).toStrictEqual({
      ...initialState,
      stepNumber: 4,
    });
  });

  it('should change the sort order on setSort', () => {
    expect(gameSlice(initialState, setSort())).toStrictEqual({
      ...initialState,
      ascending: true,
    });
  });
});
