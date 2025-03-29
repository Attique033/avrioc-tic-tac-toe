import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useAuth} from '../context/AuthContext';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import {useTokenPersistence} from '../hooks/useTokenPersistence';

const RootNavigator = () => {
  const {isAuthenticated} = useAuth();
  
  useTokenPersistence();

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
