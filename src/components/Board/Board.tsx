import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  historySelector,
  stepNumberSelector,
  xIsNextSelector,
  winnerSelector,
  selectSquare,
} from 'components/Game/gameSlice';

export default function Board() {
  const dispatch = useDispatch();

  const history = useSelector(historySelector);
  const stepNumber = useSelector(stepNumberSelector);
  const xIsNext = useSelector(xIsNextSelector);
  const winner = useSelector(winnerSelector);

  const currentHistory = history.slice(0, stepNumber + 1);
  const currentBoard = currentHistory[stepNumber];
  const squares = currentBoard.squares.slice();

  const handleClick = (i: number): void => {
    // If there's a winner or if there's an X or O in the square, do nothing
    if (winner || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    const col = i % 3;
    const row = Math.floor(i / 3);
    const lastSquare = [col, row];
    dispatch(selectSquare({ squares, lastSquare, currentHistory }));
  };

  const renderSquare = (i: number): React.ReactNode => {
    return (
      <button
        type="button"
        className={winner?.cells.includes(i) ? 'square winner' : 'square'}
        onClick={() => handleClick(i)}
      >
        {squares[i]}
      </button>
    );
  };

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}
