import gameSlice, {
  //   historySelector,
  //   stepNumberSelector,
  //   xIsNextSelector,
  //   ascendingSelector,
  //   winnerSelector,
  setSort,
  selectHistory,
  initialState,
} from './gameSlice';

describe('gameSlice reducer', () => {
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
