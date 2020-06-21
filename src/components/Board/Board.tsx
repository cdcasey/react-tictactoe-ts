import React from 'react';

export default function Board() {
  const handleClick = () => {
    return 'X';
  };

  const renderSquare = (i: Number) => (
    <button
      type="button"
      className="square"
      //   className={props.winningCells.includes(i) ? 'square winner' : 'square'}
      onClick={handleClick}
    >
      {i}
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
