import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { theme } from './src/theme/theme';
import { AuthProvider } from './src/context/AuthContext';
import RootNavigator from './src/navigation';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './src/store';
import NotificationBanner from './src/components/notification';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';

SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style={'light'} />
      <PaperProvider theme={theme}>
        <ReduxProvider store={store}>
          <NotificationBanner />
          <AuthProvider>
            <RootNavigator />
          </AuthProvider>
        </ReduxProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
