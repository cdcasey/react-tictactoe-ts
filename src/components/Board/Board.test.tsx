import React from 'react';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';

import store from 'store';
import Board from './BoardContainer';

test('renders learn react link', () => {
  render(
    <Provider store={store}>
      <Board />
    </Provider>,
  );
  const squares = screen.getAllByRole('button');
  expect(squares.length).toBe(9);
  const [firstSquare, secondSquare] = squares;
  expect(firstSquare).toBeInTheDocument();
  expect(firstSquare).toHaveTextContent('');
  fireEvent.click(firstSquare);
  expect(firstSquare).toHaveTextContent('X');
  fireEvent.click(secondSquare);
  expect(secondSquare).toHaveTextContent('O');
  fireEvent.click(firstSquare);
  expect(firstSquare).toHaveTextContent('X');
});
