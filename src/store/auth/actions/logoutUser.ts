import { AppDispatch } from '../../types';
import { clearSessionToken } from '../../../utils/storage/Auth';
import { clearGameSessionId } from '../../../utils/storage/Game';
import { authSlice } from '../index';
import { statsSlice } from '../../stats';

type LogoutUser = () => (dispatch: AppDispatch) => Promise<void>;

export const logoutUser: LogoutUser = () => {
  return async (dispatch) => {
    try {
      await clearSessionToken();
      await clearGameSessionId();
      dispatch(statsSlice.actions.resetStats());
      dispatch(authSlice.actions.logout());
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
};
