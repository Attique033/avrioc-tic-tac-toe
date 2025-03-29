import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Surface, Text } from 'react-native-paper';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useAppSelector } from '../../store';
import { useNotificationActions } from '../../store/notification/useNotificationActions';

const PROGRESS_DURATION = 3000; // 3 seconds

export const NotificationBanner: React.FC = () => {
  const { notification } = useAppSelector((state) => state.notification);

  const { resetNotification } = useNotificationActions();

  const translateY = useSharedValue(-100);
  const opacity = useSharedValue(0);
  const progress = useSharedValue(1);

  useEffect(() => {
    if (notification?.title) {
      // Animate in
      translateY.value = withSpring(0, { damping: 15 });
      opacity.value = withTiming(1, { duration: 300 });

      // Start progress animation
      progress.value = withTiming(0, { duration: PROGRESS_DURATION }, () => {
        runOnJS(dismiss)();
      });
    }
  }, [notification?.title]);

  const dismiss = () => {
    translateY.value = withSpring(-100, { damping: 15 });
    opacity.value = withTiming(0, { duration: 300 }, () => {
      resetNotification();
    });
  };

  const bannerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      opacity: opacity.value,
    };
  });

  const progressStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value * 100}%`,
    };
  });

  const getBackgroundColor = () => {
    switch (notification?.type) {
      case 'success':
        return '#28A745';
      case 'error':
        return '#DC3545';
      default:
        return '#4A90E2';
    }
  };

  const getIcon = () => {
    switch (notification?.type) {
      case 'success':
        return 'check-circle';
      case 'error':
        return 'alert-circle';
      default:
        return 'information';
    }
  };

  if (!notification || !notification?.title) return null;

  return (
    <Animated.View style={[styles.container, bannerStyle]}>
      <Surface style={[styles.banner, { backgroundColor: getBackgroundColor() }]}>
        <Animated.View style={[styles.progressBar, progressStyle]} />
        <Animated.View style={styles.content}>
          <IconButton icon={getIcon()} size={24} iconColor="white" style={styles.icon} />
          <View>
            {notification.message && (
              <Text style={styles.message} variant="bodyMedium">
                {notification.message}
              </Text>
            )}
            {notification.message && (
              <Text style={styles.message} variant="bodyMedium">
                {notification.message}
              </Text>
            )}
          </View>

          <IconButton
            icon="close"
            size={20}
            iconColor="white"
            onPress={dismiss}
            style={styles.closeButton}
          />
        </Animated.View>
      </Surface>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  banner: {
    margin: 16,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 4,
  },
  progressBar: {
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
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
    color: 'white',
    marginRight: 8,
  },
  message: {
    flex: 1,
    color: '#8c8c8c',
    marginRight: 8,
  },
  closeButton: {
    margin: 0,
    padding: 0,
  },
});
