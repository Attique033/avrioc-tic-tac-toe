import { AppDispatch } from '../../types';
import { statsSlice } from '../index';
import { gameService } from '../../../services/api';
import { NotificationType } from '../../../types';
import { notificationSlice } from '../../notification';

type GetStats = () => (dispatch: AppDispatch) => Promise<void>;

export const getStats: GetStats = () => {
  return async (dispatch) => {
    try {
      const data = await gameService.getStats();
      dispatch(statsSlice.actions.setStats(data.stats));
    } catch (error) {
      const errorMessage = error?.response?.data?.error || error?.message || 'Something went wrong';
      dispatch(
        notificationSlice.actions.setNotification({
          title: 'Stats fetching failed',
          message: errorMessage,
          type: NotificationType.ERROR,
        })
      );
    }
  };
};
