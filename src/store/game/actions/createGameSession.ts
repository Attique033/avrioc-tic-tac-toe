import {AppDispatch} from '../../types';
import {gameService} from '../../../services/api';

type CreateGameSession = (
  playerStarts: boolean,
) => (dispatch: AppDispatch) => Promise<void>;

export const createGameSession: CreateGameSession = playerStarts => {
  return async dispatch => {
    try {
      const data = await gameService.startGame(playerStarts);
    } catch (error) {
      console.error(error);
    }
  };
};
