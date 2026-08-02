// shared/hooks/useAuth.ts
import { useState } from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
} from '@react-native-firebase/auth';
import {
  GoogleOneTapSignIn,
  isSuccessResponse,
  isNoSavedCredentialFoundResponse,
  isErrorWithCode,
  statusCodes,
} from 'react-native-nitro-google-signin';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginWithEmail = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
    } catch (e: any) {
      setError(mapFirebaseError(e.code));
    } finally {
      setLoading(false);
    }
  };

  const registerWithEmail = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      await createUserWithEmailAndPassword(getAuth(), email, password);
    } catch (e: any) {
      setError(mapFirebaseError(e.code));
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    setError(null);
    try {
      await GoogleOneTapSignIn.checkPlayServices();

      let response = await GoogleOneTapSignIn.signIn();
      if (isNoSavedCredentialFoundResponse(response)) {
        response = await GoogleOneTapSignIn.createAccount();
      }

      if (isSuccessResponse(response)) {
        const { idToken } = response.data;
        const credential = GoogleAuthProvider.credential(idToken);
        await signInWithCredential(getAuth(), credential);
      }
    } catch (e) {
      if (isErrorWithCode(e)) {
        if (e.code === statusCodes.SIGN_IN_CANCELLED) {
          // пользователь просто закрыл окно — ошибку показывать не нужно
        } else {
          setError('Не удалось войти через Google');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return { loginWithEmail, registerWithEmail, loginWithGoogle, loading, error };
};

const mapFirebaseError = (code: string): string => {
  switch (code) {
    case 'auth/invalid-email':
      return 'Некорректный email';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Неверный email или пароль';
    case 'auth/email-already-in-use':
      return 'Такой email уже зарегистрирован';
    case 'auth/weak-password':
      return 'Пароль слишком простой';
    default:
      return 'Ошибка авторизации';
  }
};
