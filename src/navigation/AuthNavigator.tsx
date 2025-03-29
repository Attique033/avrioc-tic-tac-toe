import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Auth/LoginScreen';
import Register from '../screens/Auth/RegisterScreen';

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}} initialRouteName="Login">
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
