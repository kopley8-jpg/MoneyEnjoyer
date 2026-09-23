import { CategoryItemSingle } from './CategoryItemSingle/CategoryItemSingle';
import { CategoryItemFolder } from './CategoryItemFolder/CategoryItemFolder';
import { NameNode } from '../../model/types/CategoryTree';
import { PartyWithId } from '@/shared/types/party';

type CategoryItemProps = {
  active: boolean;
  onPress: () => void;
  onAddressAdd: () => void;
  onChangeCategory: () => void;
  onRename: () => void;
  onAddressRename: (addressId: number) => void;
  onAddressArchive: (addressId: number) => void;
  onAddressDelete: (addressId: number) => void;
  onAddressPick: (party: PartyWithId) => void;
  onArchive: () => void;
  onDelete: () => void;
  onPick: () => void;
};

export const CategoryItem = (
  props: CategoryItemProps & { nameNode: NameNode },
) => {
  const { nameNode, active } = props;

  if (nameNode.kind === 'no-address') {
    return <CategoryItemSingle party={nameNode.party} {...props} />;
  }
  return <CategoryItemFolder item={nameNode} expanded={active} {...props} />;
};
