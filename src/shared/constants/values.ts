import { Value } from '../types/transaction';

export const VALUES = ['RUB', 'USD', 'EUR', 'UAH'] as const;

export const valueNames: Record<
  'ru',
  Record<Value, { char: string; fullName: string; shortName: string }>
> = {
  ru: {
    RUB: {
      char: '₽',
      fullName: 'рубль',
      shortName: 'руб.',
    },
    USD: {
      char: '$',
      fullName: 'доллар',
      shortName: 'дол.',
    },
    EUR: {
      char: '€',
      fullName: 'евро',
      shortName: 'евр.',
    },
    UAH: {
      char: '₴',
      fullName: 'гривна',
      shortName: 'грн.',
    },
  },
} as const;
