import { CategoryTreeType } from '../types/CategoryTree';

export const convertCategoryTreeToArray = (categoryTree: CategoryTreeType) => {
  return categoryTree.names
    .map((name) => (name.kind === 'no-address' ? name.party : name.parties))
    .flat();
};
