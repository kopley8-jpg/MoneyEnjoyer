import { typedEntries } from '@/shared/lib/typedEntries';
import { useState } from 'react';
import { FormType, Handler } from './types';
import { registerWithEmail } from '../../model/register-with-email';
import { firebaseAuthErrorCodeToClientMessage } from '@/features/auth/constants/firebaseAuthErrorCodeToClientMessage';

export const useRegisterForm = () => {
  const [form, setForm] = useState<FormType>({
    displayName: '',
    email: '',
    password: '',
    repeatPassword: '',
  });
  const [error, setError] = useState<{
    message: string;
    entries: string[];
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
      setError(firebaseAuthErrorCodeToClientMessage[error.code]);
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
