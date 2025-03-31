import React from 'react';
import { act, fireEvent, render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import NotificationBanner from '../index';
import notificationReducer, { notificationSlice } from '../../../store/notification/index';
import { NotificationType } from '../../../types';

jest.useFakeTimers();

const createTestStore = () => {
  return configureStore({
    reducer: {
      notification: notificationReducer,
    },
  });
};

describe('Notification Component', () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
    jest.clearAllTimers();
  });

  it('should not show notification when there is no notification data', () => {
    const { queryByTestId } = render(
      <Provider store={store}>
        <NotificationBanner />
      </Provider>,
    );
    expect(queryByTestId('notification-banner')).toBeNull();
  });

  it('should render ', () => {
    store.dispatch(
      notificationSlice.actions.setNotification({
        type: NotificationType.SUCCESS,
        title: 'Success',
        message: 'Account created successfully',
      }),
    );

    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <NotificationBanner />
      </Provider>,
    );

    expect(getByTestId('notification-banner')).toBeTruthy();
    expect(getByText('Success')).toBeTruthy();
    expect(getByText('Account created successfully')).toBeTruthy();
  });

  it('should render notification with error text', () => {
    store.dispatch(
      notificationSlice.actions.setNotification({
        type: NotificationType.ERROR,
        title: 'Error',
        message: 'Something went wrong',
      }),
    );

    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <NotificationBanner />
      </Provider>,
    );

    expect(getByTestId('notification-banner')).toBeTruthy();
    expect(getByText('Error')).toBeTruthy();
    expect(getByText('Something went wrong')).toBeTruthy();
  });

  it('should auto hide notification after 3 seconds', () => {
    store.dispatch(
      notificationSlice.actions.setNotification({
        type: NotificationType.SUCCESS,
        title: 'Success',
        message: 'Test message',
      }),
    );

    render(
      <Provider store={store}>
        <NotificationBanner />
      </Provider>,
    );

    expect(store.getState().notification.notification).not.toBeNull();

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(store.getState().notification.notification).toBeUndefined();
  });

  it('should close notification when close button is clicked', () => {
    store.dispatch(
      notificationSlice.actions.setNotification({
        type: NotificationType.SUCCESS,
        title: 'Success',
        message: 'Test message',
      }),
    );

    const { getByTestId } = render(
      <Provider store={store}>
        <NotificationBanner />
      </Provider>,
    );

    const closeButton = getByTestId('notification-close-button');
    fireEvent.press(closeButton);

    const state = store.getState();
    expect(state.notification.notification).toBeUndefined();
  });

  it('should show notification when message not passed', () => {
    store.dispatch(
      notificationSlice.actions.setNotification({
        type: NotificationType.SUCCESS,
        title: 'Success',
      }),
    );

    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <NotificationBanner />
      </Provider>,
    );

    expect(getByTestId('notification-banner')).toBeTruthy();
    expect(getByText('Success')).toBeTruthy();
  });
});
