import { PartyWithId } from '@/shared/types/party';
import { PositionType } from '@/shared/types/position';
import {
  TransactionPositionFields,
  TransactionPositionType,
  TransactionType,
} from '@/shared/types/transaction';

export type DraftTransactionPosition = {
  [T in PositionType & { id: string } as T['kind']]: T extends {
    measurement: 'other';
  }
    ? T & Extract<TransactionPositionFields, { type: 'other' }>
    : T extends { kind: 'money-flow' } | { measurement: 'no-unit' }
    ? T & Extract<TransactionPositionFields, { type: 'no-unit' }>
    : T & Extract<TransactionPositionFields, { type: 'unit' }>;
}[PositionType['kind']];

export type DraftTransactionType = {
  [K in keyof TransactionType as K extends 'partyId'
    ? 'party'
    : K]: K extends 'positions'
    ? DraftTransactionPosition[]
    : K extends 'partyId'
    ? PartyWithId | null
    : K extends 'date'
    ? Date
    : TransactionType[K] | null;
};

export type Change = {
  [K in keyof DraftTransactionType]: {
    entry: K;
    value: DraftTransactionType[K];
  };
}[keyof DraftTransactionType];
