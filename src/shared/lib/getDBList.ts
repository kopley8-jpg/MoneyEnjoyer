import { get, ref } from '@react-native-firebase/database';
import { database } from '../api/firebase/database';
import { getErrorMessage } from './getErrorMessage';

export const getDB = async <T>(path: string): Promise<T> => {
  const listRef = ref(database, path);

  try {
    const snapshot = await get(listRef);
    const data: T = snapshot.exists() ? snapshot.val() : [];
    return data;
  } catch (error) {
    console.log(`getDB error. Querry: ` + path + ', error:' + error);
    throw error;
  }
};
