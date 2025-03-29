import { AppDispatch } from '../../types';
import { gameService } from '../../../services/api';
import { MakeMoveRequest } from '../../../types';
import { checkGameState } from './checkGameStats';

type MakeMove = (payload: MakeMoveRequest) => (dispatch: AppDispatch) => Promise<void>;

export const makeMove: MakeMove = (payload) => {
  return async (dispatch) => {
    try {
      await gameService.makeMove(payload);
      dispatch(checkGameState());
    } catch (error) {
      console.error(error, error.data, error.response.data);
    }
  };
};
