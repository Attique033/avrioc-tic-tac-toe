import {createSlice} from '@reduxjs/toolkit';
import {GameState} from '../../types';

const initialState: GameState = {
  board: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameState: (state, action) => {
      const {board, gameStatus, currentPlayer, winner} = action.payload;
      state.board = board;
      state.gameStatus = gameStatus;
      state.currentPlayer = currentPlayer;
      state.winner = winner;
    },
    setSessionId: (state, action) => {
      state.sessionId = action.payload;
    },
    resetGameSession: () => initialState,
  },
});

export default gameSlice.reducer;
