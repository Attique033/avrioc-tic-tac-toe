import {useMemo} from 'react';

import {LoginUserRequest, RegisterUserRequest} from '../../types';
import {useAppDispatch} from '../index';
import {loginUser, logoutUser, registerUser} from './actions';

export const useAuthActions = () => {
  const dispatch = useAppDispatch();
  return useMemo(() => {
    return {
      loginUser: (params: LoginUserRequest) => {
        dispatch(loginUser(params));
      },
      registerUser: (params: RegisterUserRequest) => {
        dispatch(registerUser(params));
      },
      logoutUser: () => {
        dispatch(logoutUser());
      },
    };
  }, [dispatch]);
};
