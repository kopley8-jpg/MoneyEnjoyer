import { VALUES } from '../constants/values';

export type Value = (typeof VALUES)[number];

export type TransactionType = {
  id: string;
  type: 'spend' | 'earn';
  serialNumber: number;
  date: number;
  partyId: string;
  value: Value;
  positions: TransactionPositionType[];
  summ: number;
  paymentWay: PaymentWayType;
};

export type TransactionPositionType = {
  id: string;
  positionId: string;
} & Partial<TransactionPositionFields>;

export type TransactionPositionFields =
  | {
      type: 'unit';
      quantity: number | null;
      price: number | null;
    }
  | {
      type: 'other';
      quantity: number | null;
      unit: string | null;
      price: number | null;
    }
  | { type: 'no-unit'; price: number | null };

export type PaymentWayType =
  | { type: 'cash' }
  | { type: 'cashless' }
  | {
      type: 'mixed';
      cash: number;
      cashLess: number;
    };
