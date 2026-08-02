import { useSessionStore } from '@/entities/session/model/sessionStore';
import { createNewUser } from '@/shared/lib/createNewUser';
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
  reload,
} from '@react-native-firebase/auth';
import { getDatabase, ref, set } from '@react-native-firebase/database';

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

    const db = getDatabase();
    const dbRef = ref(db, `users/${userCredential.user.uid}`);
    await set(dbRef, createNewUser(email, displayName));

    setFirebaseUser(getAuth().currentUser);
  } finally {
    setIsRegistering(false);
  }
};
