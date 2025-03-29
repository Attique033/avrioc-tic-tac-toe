import React from 'react';
import GameScreen from '../GameScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StatsScreen from '../StatsScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../../theme/colors';
import { BlurView } from 'expo-blur';

const Tab = createBottomTabNavigator();

const TabIcons = {
  Focused: {
    Game: 'game-controller',
    Stats: 'analytics-sharp',
  },
  Unfocused: {
    Game: 'game-controller-outline',
    Stats: 'analytics',
  },
};
const HomeScreen: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <Icon
              name={TabIcons[focused ? 'Focused' : 'Unfocused'][route.name]}
              size={size}
              color={!focused ? colors.text.secondary : colors.primary}
            />
          );
        },
        tabBarActiveTintColor: colors.primary,
        lazy: true,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
          shadowColor: 'transparent',
        },
        tabBarBackground: () => {
          return <BlurView tint={'light'} intensity={55} style={{ flex: 1 }} />;
        },
      })}
    >
      <Tab.Screen name="Game" component={GameScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Stats" component={StatsScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default HomeScreen;
