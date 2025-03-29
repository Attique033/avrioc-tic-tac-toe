import { AppDispatch, GetState } from '../../types';
import { gameService } from '../../../services/api';
import { checkGameState } from './checkGameStats';
import { notificationSlice } from '../../notification';
import { NotificationType } from '../../../types';

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
      const errorMessage = error?.response?.data?.error || error?.message || 'Something went wrong';
      dispatch(
        notificationSlice.actions.setNotification({
          title: "Oops! That's an error",
          message: errorMessage,
          type: NotificationType.ERROR,
        })
      );
    }
  };
};
