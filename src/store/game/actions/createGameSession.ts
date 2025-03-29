import {AppDispatch} from '../../types';
import {gameService} from '../../../services/api';
import {gameSlice} from "../index";

type CreateGameSession = (
    startWithPlayer: boolean,
) => (dispatch: AppDispatch) => Promise<void>;

export const createGameSession: CreateGameSession = startWithPlayer => {
  return async dispatch => {
    try {
      const data = await gameService.createGameSession(startWithPlayer);
      dispatch(gameSlice.actions.setSessionId(data.id));
      dispatch(gameSlice.actions.setGameState(data));
    } catch (error) {
      console.error(error);
    }
  };
};
