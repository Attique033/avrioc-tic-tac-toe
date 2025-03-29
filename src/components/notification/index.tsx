import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Surface, Text } from 'react-native-paper';
import { useAppSelector } from '../../store';
import { useNotificationActions } from '../../store/notification/useNotificationActions';
import { NotificationType } from '../../types';
import { colors } from '../../theme/colors';

const PROGRESS_DURATION = 3000;

export const NotificationBanner: React.FC = () => {
  const { notification } = useAppSelector((state) => state.notification);

  const { resetNotification } = useNotificationActions();

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
    <View style={[styles.container, { display: notification ? 'flex' : 'none' }]}>
      <Surface style={[styles.banner, { backgroundColor: getBackgroundColor() }]}>
        <View style={styles.content}>
          <IconButton icon={getIcon()} size={24} iconColor="white" style={styles.icon} />
          <View>
            {notification.title && (
              <Text style={styles.title} variant="bodyMedium">
                {notification.title}
              </Text>
            )}
            {notification.message && (
              <Text style={styles.message} variant="bodyMedium">
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
          style={styles.closeButton}
        />
      </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '2%',
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
    alignItems: 'center',
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
    alignItems: 'center',
    padding: 12,
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
