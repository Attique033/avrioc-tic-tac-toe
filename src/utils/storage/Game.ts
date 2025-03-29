import { getSecureStorage, removeSecureStorage, setSecureStorage } from '../../services/storage';
import { StorageKeys } from './types';

export const saveGameSessionId = async (value: string) => {
  await setSecureStorage(StorageKeys.TOKEN, value);
};

export const getGameSessionId = async () => {
  return await getSecureStorage(StorageKeys.GAME_SESSION_ID);
};

export const clearGameSessionId = async () => {
  await removeSecureStorage(StorageKeys.GAME_SESSION_ID);
};
