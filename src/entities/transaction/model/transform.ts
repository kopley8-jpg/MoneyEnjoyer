import { recordToArray } from '@/shared/lib/recordToArray';
import { TransactionsDB } from './types';
import { TransactionType } from '@/shared/types/transaction';

export const DBToApp = (transactions: TransactionsDB): TransactionType[] => {
  return recordToArray(transactions).map((transaction) => ({
    ...transaction,
    positions: recordToArray(transaction.positions),
  }));
};
