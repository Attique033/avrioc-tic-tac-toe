import { AppDispatch, GetState } from '../../types';
import { gameService } from '../../../services/api';
import { gameSlice } from '../index';
import { GameStatus, Player } from '../../../types';
import { makePCMove } from './makePCMove';

type CheckGameState = () => (dispatch: AppDispatch, getState: GetState) => Promise<void>;

export const checkGameState: CheckGameState = () => {
  return async (dispatch, getState) => {
    try {
      const { sessionId } = getState().game;
      const gameState = await gameService.getGameState(sessionId);
      dispatch(gameSlice.actions.setGameState(gameState));
      if (gameState.status === GameStatus.ONGOING && gameState.currentPlayer === Player.X) {
        dispatch(makePCMove());
      }
    } catch (error) {
      console.error(error, error.data, error.response.data);
    }
  };
};
