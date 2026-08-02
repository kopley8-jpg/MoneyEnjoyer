import { typedEntries } from '@/shared/lib/typedEntries';
import { useState } from 'react';
import { FormType, Handler } from './types';
import { registerWithEmail } from '../../model/register-with-email';

export const useRegisterForm = () => {
  const [form, setForm] = useState<FormType>({
    displayName: '',
    email: '',
    password: '',
    repeatPassword: '',
  });
  const [error, setError] = useState<{
    message: string;
    entries: (keyof FormType)[];
  } | null>(null);

  const handleTextFieldChange = (key: keyof FormType, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleButtonPress = async () => {
    setError(null);
    const emptyEntries = typedEntries(form)
      .filter(([, value]) => value === '')
      .map(([key]) => key);
    if (emptyEntries.length > 0) {
      setError({
        message: 'Заполните все поля',
        entries: emptyEntries,
      });
      return;
    }
    if (form.password != form.repeatPassword) {
      setError({
        message: 'Пароли не совпадают',
        entries: ['password', 'repeatPassword'],
      });
      return;
    }

    try {
      await registerWithEmail(form.email, form.password, form.displayName);
    } catch (error: any) {
      setError(firebaseErrorCodeToError(error.code));
    }
  };

  const handler: Handler = {
    handleTextInputChange(key) {
      return {
        onChangeText(text) {
          handleTextFieldChange(key, text);
        },
      };
    },
    button: {
      onPress: handleButtonPress,
    },
  };

  return { form, error, handler };
};

const firebaseErrorCodeToError = (
  errorCode: string,
): { message: string; entries: (keyof FormType)[] } => {
  switch (errorCode) {
    case 'auth/invalid-email':
      return { message: 'Некорректный e-mail', entries: ['email'] };
    case 'auth/weak-password':
      return {
        message: 'Слишком короткий пароль, введите более 6 символов',
        entries: ['password'],
      };
    case 'auth/email-already-in-use':
      return {
        message: 'Пользователь с таким e-mail уже существует',
        entries: ['email'],
      };
    case 'auth/network-request-failed': {
      return {
        message: 'Ошибка подключения',
        entries: [],
      };
    }
  }
  return { message: errorCode, entries: [] };
};
