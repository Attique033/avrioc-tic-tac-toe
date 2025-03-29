import {useMemo} from 'react';

import {Notification} from '../../types';
import {useAppDispatch} from '../index';
import {notificationSlice} from "./index";

export const useNotificationActions = () => {
    const dispatch = useAppDispatch();
    return useMemo(() => {
        return {
            setNotification: (params: Notification) => {
                dispatch(notificationSlice.actions.setNotification(params));
            },
            resetNotification: () => {
                dispatch(notificationSlice.actions.clearNotification());
            },
        };
    }, [dispatch]);
};
