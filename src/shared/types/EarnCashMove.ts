import { VALUES } from '../constants/values';

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
  positions: EarnPosType[];
};

export type EarnPosType = {
  id: string;
  category: string;
  name: string;
  summ: number;
  value: (typeof VALUES)[number];
};
