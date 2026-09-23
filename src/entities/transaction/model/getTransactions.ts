import { useSessionStore } from '@/entities/session/model/sessionStore';
import { getDB } from '@/shared/lib/getDBList';
import { showErrorToast } from '@/shared/lib/showErrorToast';
import { TransactionsDB, TransactionsDBSchema } from './types';
import { DBToApp } from './transform';

export const getTransactions = async () => {
  const uid = useSessionStore.getState().firebaseUser?.uid;

  if (!uid) {
    showErrorToast(
      'Ошибка при загрузке транзакций: пользователь не авторизован',
    );
    return null;
  }

  try {
    const snapshot = await getDB<TransactionsDB>(`users/${uid}/transactions`);

    const result = TransactionsDBSchema.safeParse(snapshot);

    if (result.success) {
      return DBToApp(result.data);
    } else {
      console.log('getTransactions zod validation error: ' + result.error);
      return null;
    }
  } catch (error) {
    console.error('getTransactions error:', error);
    return null;
  }
};
