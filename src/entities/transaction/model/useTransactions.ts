import { useSessionStore } from '@/entities/session/model/sessionStore';
import { TransactionsDB, TransactionsDBSchema } from './types';
import { DBToApp } from './transform';
import { useDb } from '@/shared/hooks/useDB';

export const useTransactions = () => {
  const uid = useSessionStore((state) => state.firebaseUser?.uid);

  const { data, loading, error } = useDb<TransactionsDB>(
    uid ? `users/${uid}/transactions` : null,
    TransactionsDBSchema,
  );

  return { transactions: data ? DBToApp(data) : null, loading, error };
};
