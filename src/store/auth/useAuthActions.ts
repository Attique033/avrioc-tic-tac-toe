import {useMemo} from 'react';

import {LoginUserRequest, RegisterUserRequest, UserSession} from '../../types';
import {useAppDispatch} from '../index';
import {loginUser, logoutUser, registerUser} from './actions';
import { authSlice } from '.';

export const useAuthActions = () => {
  const dispatch = useAppDispatch();
  return useMemo(() => {
    return {
      loginUser: (params: LoginUserRequest) => {
        dispatch(loginUser(params));
      },
      setSession: (session: UserSession) => {
        dispatch(authSlice.actions.setSession(session));
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
