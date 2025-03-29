import {
  getSecureStorage,
  removeSecureStorage,
  setSecureStorage,
} from '../../services/storage';
import {StorageKeys} from './types';

export const saveSessionToken = async (value: string) => {
  await setSecureStorage(StorageKeys.TOKEN, value);
};

export const getSessionToken = async () => {
  return await getSecureStorage(StorageKeys.TOKEN);
};

export const clearSessionToken = async () => {
  await removeSecureStorage(StorageKeys.TOKEN);
};
