import { VALUES } from '../constants/values';

export type SpendingCashMoveType = {
  type: 'spend';
  id: string;
  date: Date;
  destinationId: string;
  check: {
    category: string;
    name: string;
    price: number;
    value: (typeof VALUES)[number];
  }[];
  paymentWay:
    | ('cash' | 'cashless')
    | {
        cash: { sum: number; value: (typeof VALUES)[number] };
        cashLessSum: { sum: number; value: (typeof VALUES)[number] };
      };
};

export type DestinationType = {
  id: string;
  category: string;
  name: string;
  positions: SpendPosType[];
};

export type SpendPosType = {
  id: string;
  category: string;
  name: string;
  lastPrice: number;
};
