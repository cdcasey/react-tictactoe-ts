import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

import Game from './Game';
import gameReducer, { initialState as gameInitialState } from './gameSlice';
import store from 'store';

function renderWithRedux(
  ui: any,
  {
    initialState = gameInitialState,
    store = configureStore({
      reducer: {
        game: gameReducer,
      },
    }),
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }: any) {
    return <Provider store={store}>{children}</Provider>;
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

describe('The game', () => {
  it('should renders', () => {
    render(
      <Provider store={store}>
        <Game />
      </Provider>,
    );
    const goTo = screen.getByText(/Go to game start/i);
    expect(goTo).toBeInTheDocument;
    fireEvent.click(goTo);
    const reverse = screen.getByText(/Reverse sort order/i);
    expect(reverse).toBeInTheDocument;
    fireEvent.click(reverse);
  });

  it('should display a winner', () => {
    const { container } = render(
      <Provider store={store}>
        <Game />
      </Provider>,
    );
    let winner = screen.queryByText(/Winner: X/i);
    expect(winner).toBeNull();
    const squares = container.querySelectorAll('.square');
    squares.forEach((square) => {
      fireEvent.click(square);
    });
    winner = screen.queryByText(/Winner: X/i);
    expect(winner).toBeTruthy();
  });

  it('should indicate a draw draw', () => {
    const { container } = renderWithRedux(<Game />);
    let winner = screen.queryByText(/Draw/i);
    expect(winner).toBeNull();
    const squares = container.querySelectorAll('.square');
    expect(squares.length).toBe(9);
    fireEvent.click(squares[4]);
    fireEvent.click(squares[2]);
    fireEvent.click(squares[8]);
    fireEvent.click(squares[0]);
    fireEvent.click(squares[1]);
    fireEvent.click(squares[7]);
    fireEvent.click(squares[3]);
    fireEvent.click(squares[5]);
    fireEvent.click(squares[6]);
    winner = screen.queryByText(/Draw/i);
    expect(winner).toBeTruthy();
  });
});
