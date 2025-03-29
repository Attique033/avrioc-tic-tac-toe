import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/App/HomeScreen';

const AppStack = createStackNavigator();

const AppNavigator = () => {
  return (
    <AppStack.Navigator screenOptions={{headerShown: false}}>
      <AppStack.Screen name="Home" component={Home} />
    </AppStack.Navigator>
  );
};

export default AppNavigator;
