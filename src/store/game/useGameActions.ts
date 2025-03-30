import {useMemo} from 'react';

import {useAppDispatch} from '../index';
import {createGameSession} from './actions/createGameSession';
import {Board, MakeMoveRequest} from '../../types';
import {makeMove} from './actions/makeMove';
import {gameSlice} from './index';

export const useGameActions = () => {
    const dispatch = useAppDispatch();
    return useMemo(() => {
        return {
            createNewSession: (startWithPlayer: boolean) => {
                dispatch(createGameSession(startWithPlayer));
            },
            createSessionWithPlayerMove: (board: Board) => {
                dispatch(createGameSession(true, board));
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
