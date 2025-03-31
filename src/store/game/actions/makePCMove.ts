import { AppDispatch, GetState } from '../../types';
import { gameService } from '../../../services/api';
import { notificationSlice } from '../../notification';
import { NotificationType } from '../../../types';
import { checkGameState } from './index';

type MakePCMove = () => (dispatch: AppDispatch, getState: GetState) => Promise<void>;

const makePCMove: MakePCMove = () => {
  return async (dispatch, getState) => {
    try {
      const { board, sessionId } = getState().game;
      const delay = Math.floor(Math.random() * 800) + 200;
      setTimeout(async () => {
        await gameService.pcMove({
          board: board,
          sessionId: sessionId,
        });
        dispatch(checkGameState());
      }, delay);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error || error?.message || 'Something went wrong';
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

export default makePCMove;
