export type userDataType = {
  senders: SenderType[];
  destinations: DestinationType[];
  cashMoves: (EarnCashMoveType | SpendingCashMoveType)[];
};

export type EarnCashMoveType = {
  id: string;
  date: Date;
  category: string;
  senderId: string;
};

export type SenderType = {
  id: string;
  category: string;
  name: string;
};

export type SpendingCashMoveType = {
  id: string;
  date: Date;
  destinationId: string;
  check: {
    category: string;
    name: string;
    summ: number;
    value: (typeof VALUES)[number];
  }[];
  paymentWay: ('cash' | 'cashless') | { cashSum: number; cashLessSum: number };
};

export type DestinationType = {
  id: string;
  category: string;
  name: string;
  offers: PositionType[];
};

export type PositionType = {
  id: string;
  category: string;
  name: string;
  lastPrice: number;
};

export const VALUES = ['RUB', 'USD', 'EUR', 'UAH'] as const;
