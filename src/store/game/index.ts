import { createSlice } from '@reduxjs/toolkit';
import { GameState } from '../../types';

const initialState: GameState = {
  board: [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ],
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameState: (state, action) => {
      const { board, status, currentPlayer, winner } = action.payload;
      state.board = typeof board === 'string' ? JSON.parse(board) : board;
      state.status = status;
      state.currentPlayer = currentPlayer;
      state.winner = winner;
    },
    setSessionId: (state, action) => {
      state.sessionId = action.payload;
    },
  },
});

export default gameSlice.reducer;
