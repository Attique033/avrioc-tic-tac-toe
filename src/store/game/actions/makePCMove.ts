import { AppDispatch, GetState } from '../../types';
import { gameService } from '../../../services/api';
import { gameSlice } from '../index';

type MakePCMove = () => (dispatch: AppDispatch, getState: GetState) => Promise<void>;

export const makePCMove: MakePCMove = () => {
  return async (dispatch, getState) => {
    try {
      const { board, sessionId } = getState().game;
      const engineMove = await gameService.pcMove({
        board: board,
        sessionId: sessionId,
      });
      dispatch(gameSlice.actions.setBoard(engineMove.board));
      dispatch(gameSlice.actions.setGameStatus(engineMove.gameStatus));
      console.error('pcMoveState', engineMove, engineMove.board);
    } catch (error) {
      console.error(error, error.data, error.response.data);
    }
  };
};
