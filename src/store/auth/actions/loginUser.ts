import { AppDispatch } from '../../types';
import { authSlice } from '../index';
import { authService } from '../../../services/api';
import { LoginUserRequest, NotificationType } from '../../../types';
import { notificationSlice } from '../../notification';
import { saveUserData } from '../../../utils/storage/Auth';

type LoginUser = (params: LoginUserRequest) => (dispatch: AppDispatch) => Promise<void>;

export const loginUser: LoginUser = (params) => {
  return async (dispatch) => {
    try {
      dispatch(authSlice.actions.setLoading(true));
      const data = await authService.login(params);
      await saveUserData(data);
      dispatch(authSlice.actions.setSession(data));
    } catch (error) {
      console.error(error);
      dispatch(
        notificationSlice.actions.setNotification({
          title: 'Login failed',
          message: error.message || 'Something went wrong',
          type: NotificationType.ERROR,
        })
      );
    } finally {
      dispatch(authSlice.actions.setLoading(false));
    }
  };
};
