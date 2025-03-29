import React from 'react';
import GameScreen from '../GameScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import StatsScreen from '../StatsScreen';

const Tab = createBottomTabNavigator();

const HomeScreen: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Game" component={GameScreen} />
      <Tab.Screen name="Stats" component={StatsScreen} />
    </Tab.Navigator>
  );
};

export default HomeScreen;
