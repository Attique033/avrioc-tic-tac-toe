import { AppDispatch } from '../../types';
import { gameService } from '../../../services/api';
import { MakeMoveRequest, NotificationType } from '../../../types';
import { checkGameState } from './checkGameStats';
import { notificationSlice } from '../../notification';

type MakeMove = (payload: MakeMoveRequest) => (dispatch: AppDispatch) => Promise<void>;

export const makeMove: MakeMove = (payload) => {
  return async (dispatch) => {
    try {
      await gameService.makeMove(payload);
      dispatch(checkGameState());
    } catch (error) {
      const errorMessage = error?.response?.data?.error || error?.message || 'Something went wrong';
      dispatch(
        notificationSlice.actions.setNotification({
          title: 'That move failed',
          message: errorMessage,
          type: NotificationType.ERROR,
        })
      );
    }
  };
};
