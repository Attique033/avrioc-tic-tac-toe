import { AppDispatch, GetState } from '../../types';
import { gameService } from '../../../services/api';
import { checkGameState } from './checkGameStats';

type MakePCMove = () => (dispatch: AppDispatch, getState: GetState) => Promise<void>;

export const makePCMove: MakePCMove = () => {
  return async (dispatch, getState) => {
    try {
      const { board, sessionId } = getState().game;
      await gameService.pcMove({
        board: board,
        sessionId: sessionId,
      });
      dispatch(checkGameState());
    } catch (error) {
      console.error(error, error.data, error.response.data);
    }
  };
};
