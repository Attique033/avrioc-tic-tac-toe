import {Notification} from "../../types";
import {createSlice} from "@reduxjs/toolkit";

interface NotificationState {
    notification?: Notification;
}

const initialState: NotificationState = {
    notification: undefined,
};

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification: (state, action) => {
            state.notification = action.payload.notification;
        },
        clearNotification: (state) => {
            state.notification = undefined;
        },
    },
});

export default notificationSlice.reducer;
