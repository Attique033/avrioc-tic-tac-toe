import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types';

type AuthState = {
  user?: User;
  token?: string;
  isAuthenticated: boolean;
  loading: boolean;
};

const initialState: AuthState = {
  loading: false,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload.loading;
    },
    setSession: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = !!action.payload.token;
    },
    logout: () => {
      return initialState;
    },
  },
});

export default authSlice.reducer;
