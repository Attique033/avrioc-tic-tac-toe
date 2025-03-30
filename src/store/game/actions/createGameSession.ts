import {AppDispatch} from '../../types';
import {gameService} from '../../../services/api';
import {gameSlice} from '../index';
import {makePCMove} from './makePCMove';
import {notificationSlice} from '../../notification';
import {Board, NotificationType} from '../../../types';
import {makeMove} from "./makeMove";

type CreateGameSession = (startWithPlayer: boolean, board?: Board) => (dispatch: AppDispatch) => Promise<void>;

export const createGameSession: CreateGameSession = (startWithPlayer, board) => {
    return async (dispatch) => {
        try {
            const data = await gameService.createGameSession(startWithPlayer);
            dispatch(gameSlice.actions.setSessionId(data.id));
            dispatch(gameSlice.actions.setGameState(data));
            if (startWithPlayer && board) {

                dispatch(makeMove({
                    sessionId: data.id.toString(),
                    board
                }))
            } else {
                dispatch(makePCMove())
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.error || error?.message || 'Something went wrong';
            dispatch(
                notificationSlice.actions.setNotification({
                    title: 'Creating game session failed',
                    message: errorMessage,
                    type: NotificationType.ERROR,
                })
            );
        }
    };
};
