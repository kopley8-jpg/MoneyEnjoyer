import { PartyType, PartyWithId } from '@/shared/types/transaction';

export type PartiesBrowserProps = {
  parties: (PartyType & { id: string })[];
  onGoBack: () => void;
  onPick: (party: PartyWithId) => void;
};
