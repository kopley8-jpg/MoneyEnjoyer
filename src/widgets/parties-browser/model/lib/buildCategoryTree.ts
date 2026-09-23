import { groupBy } from '@/shared/lib/groupBy';
import { PartyType } from '@/shared/types/transaction';
import { CategoryTreeType, PartyWithId } from '../types/CategoryTree';

export const buildCategoryTree = (
  parties: PartyWithId[],
): CategoryTreeType[] => {
  const byCategory: { category: string; parties: PartyWithId[] }[] =
    Object.entries(groupBy(parties, (p) => p.category)).map(
      ([category, parties]) => ({ category, parties }),
    );
  return byCategory.map(({ category, parties }) => {
    const byNames: { name: string; parties: PartyWithId[] }[] = Object.entries(
      groupBy(parties, (p) => p.name),
    ).map(([name, parties]) => ({ name, parties }));

    return {
      category,
      names: byNames.map(({ name, parties }) => {
        const hasAddress = parties.some((p) => p.address);

        if (hasAddress) {
          return {
            kind: 'with-address',
            name,
            parties: parties,
          };
        } else {
          return {
            kind: 'no-address',
            name,
            party: parties[0],
          };
        }
      }),
    };
  });
};

// // entities/party/model/lib/buildCategoryTree.ts
// import { groupBy } from '@/shared/lib/groupBy';
// import { PartyType } from '@/shared/types/Transaction';

// export type CategoryTreeType = { category: string; names: NameTreeType[] };
// export type NameTreeType = {
//   name: string;
//   parties: (PartyType & { id: string })[];
// };

// export const buildCategoryTree = (
//   parties: (PartyType & { id: string })[],
// ): CategoryTreeType[] => {
//   const byCategory = groupBy(parties, (p) => p.category);
//   return Object.entries(byCategory).map(([category, list]) => ({
//     category,
//     names: Object.entries(groupBy(list, (p) => p.name)).map(
//       ([name, parties]) => ({
//         name,
//         parties,
//       }),
//     ),
//   }));
// };

// entities/party/model/lib/buildCategoryTree.ts
