import * as SecureStore from 'expo-secure-store';
import {StorageKeys} from '../utils/storage/types';

export const setSecureStorage = async (key: StorageKeys, value: string) => {
  SecureStore.setItemAsync(key, value).catch((error) => {
    console.error(`Error setting secure storage for ${key}`, error);
  });
};

export const getSecureStorage = async (key: StorageKeys) => {
  SecureStore.getItemAsync(key).then((value) => {
    return value;
  }).catch((error) => {
    console.error(`Error getting secure storage for ${key}`, error);
  })
};

export const removeSecureStorage = async (key: StorageKeys) => {
  SecureStore.deleteItemAsync(key)
    .then(() => {
      console.log('Secure storage removed');
    })
    .catch(error => {
      console.error('Error removing from secure storage', error);
    });
};
