import {
  getAuth,
  signInWithEmailAndPassword,
} from '@react-native-firebase/auth';

export const loginWithEmail = async (email: string, password: string) => {
  await signInWithEmailAndPassword(getAuth(), email, password);
};
