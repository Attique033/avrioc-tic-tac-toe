import {createSlice} from '@reduxjs/toolkit';
import {User} from '../../types';

type AuthSlice = {
  user?: User;
  token?: string;
  isAuthenticated: boolean;
  loading: boolean;
  error?: string;
};

const initialState: AuthSlice = {
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
    },
    setError: (state, action) => {
        state.error = action.payload.error;
    },
    logout: () => {
      return initialState;
    },
  },
});

export default authSlice.reducer;
