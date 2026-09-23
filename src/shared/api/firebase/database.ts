import { getDatabase } from '@react-native-firebase/database';

export const database = getDatabase(
  undefined,
  'https://moneyenjoyer-a27c6-default-rtdb.europe-west1.firebasedatabase.app',
);
