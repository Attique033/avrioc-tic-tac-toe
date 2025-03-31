import { AppDispatch, GetState } from '../../types';
import { gameService } from '../../../services/api';
import { gameSlice } from '../index';
import { GameStatus, NotificationType, Player } from '../../../types';
import { notificationSlice } from '../../notification';
import { makePCMove } from './index';

type CheckGameState = () => (dispatch: AppDispatch, getState: GetState) => Promise<void>;

const checkGameState: CheckGameState = () => {
  return async (dispatch, getState) => {
    try {
      const { sessionId } = getState().game;
      const gameState = await gameService.getGameState(sessionId);
      dispatch(gameSlice.actions.setGameState(gameState));
      if (gameState.status === GameStatus.ONGOING && gameState.currentPlayer === Player.X) {
        dispatch(makePCMove());
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.error || error?.message || 'Something went wrong';
      dispatch(
        notificationSlice.actions.setNotification({
          title: 'Oops! That\'s an error',
          message: errorMessage,
          type: NotificationType.ERROR,
        }),
      );
    }
  };
};

export default checkGameState;
