import { typedEntries } from '@/shared/lib/typedEntries';
import {
  getAuth,
  signInWithEmailAndPassword,
} from '@react-native-firebase/auth';
import { useState } from 'react';
import { TextInputChangeEvent } from 'react-native';
import { Button } from 'react-native-paper';

export const useLogInWithEMailForm = () => {
  const [form, setForm] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<{
    msg: string;
    entries: ('email' | 'password')[];
  } | null>(null);

  const handler = {
    input: (entry: 'email' | 'password') => {
      return {
        onChangeText: (text: string) => {
          setForm((prev) => ({ ...prev, [entry]: text }));
        },
      };
    },
    button: {
      onPress: async () => {
        setError(null);
        const emptyEntries = typedEntries(form)
          .filter(([_, val]) => val === '')
          .map(([key, _]) => key);
        if (emptyEntries.length > 0) {
          setError({ msg: 'Заполните все поля', entries: emptyEntries });
          return;
        }

        try {
          await signInWithEmailAndPassword(
            getAuth(),
            form.email,
            form.password,
          );
        } catch (err: any) {
          console.log(err);
        }
      },
    },
  };

  return { handler, form, error };
};
