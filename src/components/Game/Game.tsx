import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Board } from 'components/Board';
import {
  historySelector,
  stepNumberSelector,
  xIsNextSelector,
  ascendingSelector,
  winnerSelector,
  setSort,
  selectHistory,
} from './gameSlice';

export default function Game() {
  const dispatch = useDispatch();

  const history = useSelector(historySelector);
  const stepNumber = useSelector(stepNumberSelector);
  const xIsNext = useSelector(xIsNextSelector);
  const ascending = useSelector(ascendingSelector);
  const winner = useSelector(winnerSelector);

  const currentHistory = history.slice(0, stepNumber + 1);
  const currentBoard = currentHistory[stepNumber];
  const squares = currentBoard.squares.slice();

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
        <Board />
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
