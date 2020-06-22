import calculateWinner from './calculateWinner';

const xWinner = ['X', 'X', 'X'];
const oWinner = ['O', 'O', 'O'];
const draw = ['X', 'O', 'X', 'X', 'X', 'O', 'O', 'X', 'O'];

test('calculateWinner', () => {
  expect(calculateWinner(xWinner)).toStrictEqual({
    cells: [0, 1, 2],
    letter: 'X',
  });
  expect(calculateWinner(oWinner)).toStrictEqual({
    cells: [0, 1, 2],
    letter: 'O',
  });
  expect(calculateWinner(draw)).toBeNull();
});
