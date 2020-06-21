import React from 'react';

type props = {
  winningCells: Array<number>;
  squares: string[];
  onClick: (i: number) => void;
};

export default function Board({ winningCells, squares, onClick }: props) {
  const renderSquare = (i: number) => (
    <button type="button" className={winningCells.includes(i) ? 'square winner' : 'square'} onClick={() => onClick(i)}>
      {squares[i]}
    </button>
  );

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
