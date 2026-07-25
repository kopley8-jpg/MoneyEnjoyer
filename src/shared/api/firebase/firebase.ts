import auth from '@react-native-firebase/auth';
import { getDatabase } from '@react-native-firebase/database';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const database = getDatabase();
export const authInstance = auth();
