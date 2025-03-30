import { createSlice } from '@reduxjs/toolkit';
import { GameStats } from '../../types';

const initialState: GameStats = {
  totalGames: 0,
  wins: 0,
  losses: 0,
  draws: 0,
};

export const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    setStats: (state, action) => {
      const { totalGames, wins, losses, draws } = action.payload;
      state.totalGames = totalGames || wins + losses + draws; // Fallback totalGames is always the sum of wins, losses, and draws
      state.wins = wins;
      state.losses = losses;
      state.draws = draws;
    },
    resetStats: () => initialState,
  },
});

export default statsSlice.reducer;
