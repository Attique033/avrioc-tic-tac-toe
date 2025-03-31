import { useMemo } from 'react';

import { useAppDispatch } from '../index';
import { MakeMoveRequest } from '../../types';
import { gameSlice } from './index';
import { createGameSession, makeMove } from './actions';

export const useGameActions = () => {
  const dispatch = useAppDispatch();
  return useMemo(() => {
    return {
      createNewSession: (startWithPlayer: boolean) => {
        dispatch(createGameSession(startWithPlayer));
      },
      makeMove: (payload: MakeMoveRequest) => {
        dispatch(makeMove(payload));
      },
      resetGameSession: () => {
        dispatch(gameSlice.actions.resetGameSession());
      },
    };
  }, [dispatch]);
};
