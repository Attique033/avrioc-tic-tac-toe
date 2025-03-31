import { getSecureStorage, removeSecureStorage, setSecureStorage } from '../../services/storage';
import { StorageKeys } from './types';
import { UserSession } from '../../types';

export const saveSessionToken = async (value: string) => {
  await setSecureStorage(StorageKeys.TOKEN, value);
};

export const saveUserData = async (session: UserSession) => {
  await setSecureStorage(StorageKeys.USER_DETAILS, JSON.stringify(session.user));
  await saveSessionToken(session.token);
};

export const getUserData = async () => {
  const user = await getSecureStorage(StorageKeys.USER_DETAILS);
  return user ? JSON.parse(user) : null;
};

export const getSessionToken = async () => {
  return await getSecureStorage(StorageKeys.TOKEN);
};

export const clearSessionToken = async () => {
  await removeSecureStorage(StorageKeys.TOKEN);
  await removeSecureStorage(StorageKeys.USER_DETAILS);
};
