import { useMemo } from 'react';

import { useAppDispatch } from '../index';
import { getStats } from './actions';

export const useStatsActions = () => {
  const dispatch = useAppDispatch();
  return useMemo(() => {
    return {
      getStats: () => {
        dispatch(getStats());
      },
    };
  }, [dispatch]);
};
