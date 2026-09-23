export type PartyType = {
  category: string;
  name: string;
  address?: string;
};

export type PartyWithId = PartyType & { id: string };
