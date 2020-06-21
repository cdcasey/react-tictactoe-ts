import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Board } from 'components/Board';
import {
  historySelector,
  stepNumberSelector,
  xIsNextSelector,
  ascendingSelector,
  setSort,
  selectHistory,
  selectSquare,
} from './gameSlice';
import calculateWinner from 'services/calculateWinner';

export default function Game() {
  const history = useSelector(historySelector);
  const stepNumber = useSelector(stepNumberSelector);
  const xIsNext = useSelector(xIsNextSelector);
  const ascending = useSelector(ascendingSelector);

  const dispatch = useDispatch();

  const currentHistory = history.slice(0, stepNumber + 1);

  const currentBoard = currentHistory[stepNumber];
  const squares = currentBoard.squares.slice();
  const winner = calculateWinner(currentBoard.squares);

  const handleClick = (i: number) => {
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

  const moves = history.map((step, move) => {
    const currentStepClass = move === stepNumber ? 'current' : '';
    const desc = move ? `Go to move #${move} ${step.lastSquare}` : 'Go to game start';
    return (
      <li className={currentStepClass} key={step.lastSquare.toString()}>
        <button type="button" onClick={() => dispatch(selectHistory(move))}>
          {desc}
        </button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = `Winner: ${winner.letter}`;
  } else if (squares.every(Boolean)) {
    status = 'DRAW. There is no winner. You may as well stop playing.';
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board winningCells={winner ? winner.cells : []} squares={currentBoard.squares} onClick={handleClick} />
      </div>

      <div className="game-info">
        <div>{status}</div>
        <button type="button" onClick={() => dispatch(setSort())}>
          Reverse sort order
        </button>
        <ol className={ascending ? 'ascending' : 'descending'}>{moves}</ol>
      </div>
    </div>
  );
}
