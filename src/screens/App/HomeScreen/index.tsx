import React from 'react';
import GameScreen from '../GameScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StatsScreen from '../StatsScreen';
import Icon from 'react-native-vector-icons/Ionicons';

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
              color={!focused ? '#8c8c8c' : color}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Game" component={GameScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Stats" component={StatsScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default HomeScreen;
