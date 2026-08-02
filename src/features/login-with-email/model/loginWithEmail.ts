import {
  getAuth,
  signInWithEmailAndPassword,
} from '@react-native-firebase/auth';
import { useState } from 'react';

export const loginWithEmail = async (email: string, password: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  await signInWithEmailAndPassword(getAuth(), email, password);
};
