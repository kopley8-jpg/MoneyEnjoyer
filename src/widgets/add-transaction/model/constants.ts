import { formatDayMonth } from '@/shared/lib/formatDayMonth';

export const pages = [
  'type',
  'date',
  'receipt',
  'paymentWay',
  'finally-preview',
] as const;

export const translatePages = (
  transactionType: ('earn' | 'spend') | null,
  date: Date | null,
): Record<(typeof pages)[number], string> => {
  return {
    type: 'Тип транзакции',
    date: 'Дата',
    receipt:
      transactionType && date
        ? `${
            transactionType === 'earn' ? 'Доход' : 'Расход'
          } от ${formatDayMonth(date)}`
        : '',
    paymentWay: 'Тип оплаты',
    'finally-preview': 'Чек',
  };
};
