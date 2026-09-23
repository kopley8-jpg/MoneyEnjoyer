import { useSessionStore } from '@/entities/session/model/sessionStore';
import { database } from '@/shared/api/firebase/database';
import { createNewUser } from '@/shared/lib/createNewUser';
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
  reload,
} from '@react-native-firebase/auth';
import { ref, set } from '@react-native-firebase/database';
import { Alert } from 'react-native';

export const registerWithEmail = async (
  email: string,
  password: string,
  displayName: string,
) => {
  const { setIsRegistering, setFirebaseUser } = useSessionStore.getState();
  setIsRegistering(true);

  try {
    const userCredential = await createUserWithEmailAndPassword(
      getAuth(),
      email,
      password,
    );

    await updateProfile(userCredential.user, { displayName });
    await reload(userCredential.user);
    setFirebaseUser(getAuth().currentUser);

    const dbRef = ref(database, `users/${userCredential.user.uid}`);
    try {
      await set(dbRef, createNewUser(email, displayName));
    } catch (err) {}
  } finally {
    setIsRegistering(false);
  }
};
