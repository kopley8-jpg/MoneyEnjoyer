import { PartyType } from './party';
import { PositionType } from './position';
import { PositionPrice } from './positionPrice';
import { TransactionType, Value } from './transaction';

export type UserType = {
  profile: UserProfileData;
  businessData: UserBusinessData;
};

type UserBusinessData = {
  parties: Record<string, PartyType>;
  transactions: Record<string, TransactionType>;
  positions: Record<string, PositionType>;
  positionPrices: Record<string, PositionPrice>;
  balance: Partial<Record<Value, number>>;
};

type UserProfileData = {
  displayName: string;
  email: string;
  photoURL: string;
  createdAt: number;
};
