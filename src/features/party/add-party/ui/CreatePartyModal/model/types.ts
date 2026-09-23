import { PartyType } from '@/shared/types/transaction';

export type CreatePartyModalProps = {
  visible: boolean;
  transactionType?: 'earn' | 'spend';
  onDismiss: () => void;
  onCreate?: (key: string, value: PartyType) => void;
};
