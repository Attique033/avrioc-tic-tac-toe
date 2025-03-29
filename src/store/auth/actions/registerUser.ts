import {AppDispatch} from '../../types';
import {authSlice} from '../index';
import {NotificationType, RegisterUserRequest} from '../../../types';
import {authService} from '../../../services/api';
import {notificationSlice} from "../../notification";

type RegisterUser = (
  params: RegisterUserRequest,
) => (dispatch: AppDispatch) => Promise<void>;

export const registerUser: RegisterUser = params => {
  return async dispatch => {
    try {
      dispatch(authSlice.actions.setLoading(true));
      console.error('registerUser', params);
      const data = await authService.register(params);
      dispatch(authSlice.actions.setSession(data));
    } catch (error) {
        console.error('registerUser error', error);
      dispatch(notificationSlice.actions.setNotification({title: 'Registration failed', message: error.message || 'Something went wrong', type: NotificationType.ERROR}));
    } finally {
      dispatch(authSlice.actions.setLoading(false));
    }
  };
};
