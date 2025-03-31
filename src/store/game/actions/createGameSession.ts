import { AppDispatch } from '../../types';
import { gameService } from '../../../services/api';
import { gameSlice } from '../index';
import { notificationSlice } from '../../notification';
import { NotificationType } from '../../../types';
import { makePCMove } from './index';
import { saveGameSessionId } from '../../../utils/storage/Game';

type CreateGameSession = (startWithPlayer: boolean) => (dispatch: AppDispatch) => Promise<void>;

const createGameSession: CreateGameSession = (startWithPlayer) => {
  return async (dispatch) => {
    try {
      dispatch(gameSlice.actions.resetGameSession());
      const data = await gameService.createGameSession(startWithPlayer);
      await saveGameSessionId(data.id.toString());
      dispatch(gameSlice.actions.setSessionId(data.id));
      if (!startWithPlayer) {
        return dispatch(makePCMove());
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error || error?.message || 'Something went wrong';
      dispatch(
        notificationSlice.actions.setNotification({
          title: 'Creating game session failed',
          message: errorMessage,
          type: NotificationType.ERROR,
        }),
      );
    }
  };
};

export default createGameSession;
