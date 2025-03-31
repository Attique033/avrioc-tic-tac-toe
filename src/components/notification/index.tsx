import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Surface, Text } from 'react-native-paper';
import { useAppSelector } from '../../store';
import { useNotificationActions } from '../../store/notification/useNotificationActions';
import { NotificationType } from '../../types';
import { colors } from '../../theme/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const PROGRESS_DURATION = 3000;

const NotificationBanner: React.FC = () => {
  const { notification } = useAppSelector((state) => state.notification);

  const { resetNotification } = useNotificationActions();
  const { top } = useSafeAreaInsets();

  const style = styles(top);

  useEffect(() => {
    const timer = setTimeout(() => {
      resetNotification();
    }, PROGRESS_DURATION);

    return () => clearTimeout(timer);
  }, [notification]);

  const dismiss = () => {
    resetNotification();
  };

  const getBackgroundColor = () => {
    switch (notification?.type) {
      case NotificationType.SUCCESS:
        return colors.success;
      case NotificationType.ERROR:
        return colors.error;
      default:
        return colors.primary;
    }
  };

  const getIcon = () => {
    switch (notification?.type) {
      case NotificationType.SUCCESS:
        return 'check-circle';
      case NotificationType.ERROR:
        return 'alert-circle';
      default:
        return 'information';
    }
  };

  if (!notification || !notification?.title) return null;

  return (
    <View style={[style.container, { display: notification ? 'flex' : 'none' }]} testID="notification-banner">
      <Surface style={[style.banner, { backgroundColor: getBackgroundColor() }]}>
        <View style={style.content}>
          <IconButton icon={getIcon()} size={24} iconColor="white" style={style.icon} />
          <View>
            {notification.title && (
              <Text style={style.title} variant="bodyMedium">
                {notification.title}
              </Text>
            )}
            {notification.message && (
              <Text style={style.message} variant="bodyMedium">
                {notification.message}
              </Text>
            )}
          </View>
        </View>
        <IconButton
          icon="close"
          size={20}
          iconColor="white"
          onPress={dismiss}
          style={style.closeButton}
          testID="notification-close-button"
        />
      </Surface>
    </View>
  );
};

const styles = (safeAreaTop: number) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      top: safeAreaTop,
      left: 0,
      right: 0,
      zIndex: 1000,
    },
    banner: {
      margin: 16,
      borderRadius: 8,
      overflow: 'hidden',
      flexDirection: 'row',
      justifyContent: 'space-between',
      elevation: 4,
    },
    progressBar: {
      height: 3,
      backgroundColor: colors.background,
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 1,
    },
    content: {
      flexDirection: 'row',
      padding: 12,
      maxWidth: '60%',
    },
    icon: {
      margin: 0,
      padding: 0,
    },
    title: {
      flex: 1,
      color: colors.text.light,
      marginRight: 8,
    },
    message: {
      flex: 1,
      color: colors.text.light,
      marginRight: 8,
    },
    closeButton: {
      marginRight: 8,
      padding: 0,
    },
  });

export default NotificationBanner;
