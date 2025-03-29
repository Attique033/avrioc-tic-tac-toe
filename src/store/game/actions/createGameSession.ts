import { AppDispatch } from '../../types';
import { gameService } from '../../../services/api';
import { gameSlice } from '../index';
import { makePCMove } from './makePCMove';

type CreateGameSession = (startWithPlayer: boolean) => (dispatch: AppDispatch) => Promise<void>;

export const createGameSession: CreateGameSession = (startWithPlayer) => {
  return async (dispatch) => {
    try {
      const data = await gameService.createGameSession(startWithPlayer);
      dispatch(gameSlice.actions.setSessionId(data.id));
      dispatch(gameSlice.actions.setGameState(data));
      if (!startWithPlayer) {
        dispatch(makePCMove());
      }
    } catch (error) {
      console.error(error);
    }
  };
};
