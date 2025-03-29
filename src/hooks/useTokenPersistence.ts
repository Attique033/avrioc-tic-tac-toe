import { useEffect } from 'react';
import { getSessionToken, getUserData } from '../utils/storage/Auth';
import { useAuthActions } from '../store/auth/useAuthActions';
import * as SplashScreen from 'expo-splash-screen';

export const useTokenPersistence = () => {
  const { setSession } = useAuthActions();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await getSessionToken();
        const user = await getUserData();

        if (token && user) {
          setSession({
            token,
            user,
          });
        }
      } catch (error) {
        console.error('Error checking token persistence:', error);
      } finally {
        setTimeout(async () => {
          await SplashScreen.hideAsync();
        }, 500);
      }
    };
    checkToken();
  }, []);
};
