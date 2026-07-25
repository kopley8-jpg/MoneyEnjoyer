import { VALUES } from '../constants/values';
import { EarnCashMoveType, SenderType } from './EarnCashMove';
import { DestinationType, SpendingCashMoveType } from './SpendCashMove';

export type UserType = {
  UUID: string;
  data: UserDataType;
};

export type UserDataType = {
  senders: SenderType[];
  destinations: DestinationType[];
  cashMoves: (EarnCashMoveType | SpendingCashMoveType)[];
};
