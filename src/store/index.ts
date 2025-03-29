import {configureStore} from '@reduxjs/toolkit';
import {AppDispatch, RootState} from './types';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import combinerReducers from './reducers';

export const store = configureStore({
  reducer: combinerReducers,
  preloadedState: {},
});

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = useDispatch<AppDispatch>;
