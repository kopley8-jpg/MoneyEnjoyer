export const firebaseAuthErrorCodeToClientMessage: Record<
  string,
  { message: string; entries: string[] }
> = {
  'auth/invalid-email': { message: 'Некорректный e-mail', entries: ['email'] },
  'auth/weak-password': {
    message: 'Слишком короткий пароль, введите более 6 символов',
    entries: ['password'],
  },
  'auth/email-already-in-use': {
    message: 'Пользователь с таким e-mail уже существует',
    entries: ['email'],
  },
  'auth/network-request-failed': { message: 'Ошибка подключения', entries: [] },
  'auth/invalid-credential': {
    message: 'Неверный логин или пароль',
    entries: ['password', 'email'],
  },
};
