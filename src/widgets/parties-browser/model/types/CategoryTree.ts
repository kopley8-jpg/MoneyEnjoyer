import { PartyType } from '@/shared/types/transaction';

export type CategoryTreeType = {
  category: string;
  names: NameNode[];
};

export type NameNode = NoAddressNode | WithAddressNode;

export type NoAddressNode = {
  kind: 'no-address';
  name: string;
  party: PartyType & { id: string };
};
export type WithAddressNode = {
  kind: 'with-address';
  name: string;
  parties: (PartyType & { id: string })[];
};
