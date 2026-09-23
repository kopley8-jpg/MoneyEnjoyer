import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import { useSessionStore } from './sessionStore';
import { get, ref, set } from '@react-native-firebase/database';
import { createNewUser } from '@/shared/lib/createNewUser';
import { database } from '@/shared/api/firebase/database';

export const initAuthListener = () => {
  return onAuthStateChanged(getAuth(), async (user) => {
    const { setFirebaseUser, setInitializating, isRegistering } =
      useSessionStore.getState(); // ← читаем актуальное состояние на каждый вызов колбэка

    if (isRegistering) {
      // регистрация сама обновит firebaseUser в конце, со свежим displayName
      setInitializating(false);
      return;
    }

    setFirebaseUser(user);

    if (user && !isRegistering) {
      const userRef = ref(database, `users/${user.uid}`);
      const snapshot = await get(userRef);

      if (!snapshot.exists()) {
        await set(
          userRef,
          createNewUser(user.email ?? '', user.displayName ?? ''),
        );
      }
    }

    setInitializating(false);
  });
};
