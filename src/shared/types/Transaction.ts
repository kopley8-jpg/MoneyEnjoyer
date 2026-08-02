import { VALUES } from '../constants/values';

export type TransactionType = {
  type: 'spend' | 'earn';
  serialNumber: number;
  date: number;
  category: string;
  partyId: string;
  positions: Record<string, TransactionPosType>;
  paymentWay: PaymentWayType;
};

export type TransactionPosType = {
  id: string;
  category: string;
  name: string;
  summ: number;
  value: (typeof VALUES)[number];
};

export type PartyType = {
  id: string;
  category: string;
  name: string;
  templatePositions: Record<string, TransactionPosType>;
  address?: string;
};

export type PaymentWayType =
  | { type: 'cash' }
  | { type: 'cashless' }
  | {
      type: 'mixed';
      cash: { sum: number; value: (typeof VALUES)[number] };
      cashlessSum: { sum: number; value: (typeof VALUES)[number] };
    };
