import { VALUES } from '../constants/values';
import { PartyType, TransactionType } from './Transaction';

export type UserType = {
  profile: UserProfileData;
  businessData: UserBusinessData;
};

type UserBusinessData = {
  parties: Record<string, PartyType>;
  transactions: Record<string, TransactionType>;
  balance: Partial<Record<(typeof VALUES)[number], number>>;
};

type UserProfileData = {
  displayName: string;
  email: string;
  photoURL: string;
  createdAt: number;
};
