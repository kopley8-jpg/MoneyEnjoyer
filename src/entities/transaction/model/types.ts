import { VALUES } from '@/shared/constants/values';
import {
  TransactionPositionType,
  TransactionType,
} from '@/shared/types/transaction';
import { z } from 'zod';

export type TransactionDB = z.infer<typeof TransactionDBSchema>;

export type TransactionsDB = z.infer<typeof TransactionsDBSchema>;

export const TransactionPositionFieldsSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('unit'),
    quantity: z.number().nullable(),
    price: z.number().nullable(),
  }),

  z.object({
    type: z.literal('other'),
    quantity: z.number().nullable(),
    unit: z.string().nullable(),
    price: z.number().nullable(),
  }),

  z.object({
    type: z.literal('no-unit'),
    price: z.number().nullable(),
  }),
]);

export const TransactionPositionSchema = z
  .object({
    positionId: z.string(),
  })
  .and(TransactionPositionFieldsSchema);

export const TransactionDBSchema = z.object({
  type: z.enum(['spend', 'earn']),
  serialNumber: z.number(),
  date: z.number(),
  partyId: z.string(),
  value: z.enum(VALUES),
  positions: z.record(z.string(), TransactionPositionSchema),
  summ: z.number(),
  paymentWay: z.discriminatedUnion('type', [
    z.object({
      type: z.literal('cash'),
    }),
    z.object({
      type: z.literal('cashless'),
    }),
    z.object({
      type: z.literal('mixed'),
      cash: z.number(),
      cashLess: z.number(),
    }),
  ]),
});

export const TransactionsDBSchema = z.record(z.string(), TransactionDBSchema);
