import { addParty } from '@/features/party/add-party';
import { deleteParty } from '@/features/party/delete-party/deleteParty';
import { updateParty } from '@/features/party/update-party/update-party';
import { updatePartyGroup } from '@/features/party/update-party/update-party-group';
import { getErrorMessage } from '@/shared/lib/getErrorMessage';
import { useState } from 'react';
import { ToastAndroid } from 'react-native';
import { useRenameModal } from './hooks/useRenameModal';
import { convertCategoryTreeToArray } from './lib/convertCategoryTreeToArray';
import { PartiesBrowserProps } from './types';
import { CategoryTreeType, NameNode } from './types/CategoryTree';
import { buildCategoryTree } from './lib/buildCategoryTree';

export const usePartiesBrowser = (props: PartiesBrowserProps) => {
  const { parties, onPick } = props;

  const { renameModal, openRenameModal, closeRenameModal } = useRenameModal();

  const categoriesTree = buildCategoryTree(parties);

  const [pickCategoryModal, setPickCategoryModal] = useState<{
    visible: true;
    currentCategory: string;
    onPick: (category: string) => void;
  } | null>(null);

  const handleCategoryAdd = () => {
    const categoryNames = categoriesTree.map((category) => category.category);
    openRenameModal({
      title: 'Назовите категорию',
      value: '',
      existingValues: categoryNames,
      duplicateMessage: (value) => `Категория ${value} уже существует`,
      onConfirm(newCategoryName) {
        openRenameModal({
          title: 'Назовите новую сторону',
          value: '',
          existingValues: [],
          duplicateMessage: () => '',
          onConfirm(value) {
            return addParty({ category: newCategoryName, name: value });
          },
        });
      },
    });
  };

  const handler = {
    categoryAccrodion: (category: CategoryTreeType) => {
      const categoryNames = categoriesTree.map((c) => c.category);
      return {
        onRename: () => {
          const ids = convertCategoryTreeToArray(category).map((p) => p.id);
          openRenameModal({
            title: 'Переименовать категорию',
            value: category.category,
            existingValues: categoryNames,
            duplicateMessage: (value) => `Категория ${value} уже существует`,
            onConfirm(value) {
              return updatePartyGroup(ids, 'category', value);
            },
          });
        },
        onAdd: () => {
          const namesInCategory = category.names.map((n) => n.name);
          openRenameModal({
            title: 'Добавление стороны',
            value: '',
            existingValues: namesInCategory,
            duplicateMessage: (value) =>
              `Сторона "${value}" в категории "${category.category}" уже существует`,
            onConfirm(value) {
              return addParty({ category: category.category, name: value });
            },
          });
        },
      };
    },
    categoryItem: (category: CategoryTreeType, nameNode: NameNode) => {
      const namesInCategory = category.names.map((res) => res.name);
      const nodeWithAddress = nameNode.kind === 'with-address';

      return {
        onRename: () => {
          openRenameModal({
            title: 'Переименовать',
            value: nameNode.name,
            existingValues: namesInCategory,
            duplicateMessage: (value) =>
              `${value} в категории ${category.category} уже существует`,
            onConfirm(value) {
              return nodeWithAddress
                ? updatePartyGroup(
                    nameNode.parties.map((party) => party.id),
                    'name',
                    value,
                  )
                : updateParty(nameNode.party.id, 'name', value);
            },
          });
        },
        onChangeCategory: () => {
          setPickCategoryModal({
            visible: true,
            currentCategory: category.category,
            onPick(newCategory) {
              const promise = !nodeWithAddress
                ? updateParty(nameNode.party.id, 'category', newCategory)
                : updatePartyGroup(
                    nameNode.parties.map((party) => party.id),
                    'category',
                    newCategory,
                  );

              setPickCategoryModal(null);
              promise.catch((error) => {
                const message = getErrorMessage(error);
                ToastAndroid.show(
                  `Не удалось сохранить: ${message}`,
                  ToastAndroid.SHORT,
                );
              });
            },
          });
        },
        onAddressAdd: () => {
          const addressesInName = nodeWithAddress
            ? nameNode.parties.map((party) => party.address || '')
            : [];
          openRenameModal({
            title: 'Добавление филиала',
            value: '',
            existingValues: addressesInName,
            duplicateMessage: (value) =>
              ` "${nameNode.name}" по адресу "${value}" уже существует`,
            onConfirm(value) {
              return addParty({
                category: category.category,
                name: nameNode.name,
                address: value,
              });
            },
          });
        },
        onAddressRename: (id: number) => {
          if (!nodeWithAddress) return;

          const addresses = nameNode.parties.map(
            ({ address }) => address || '',
          );
          const party = nameNode.parties[id];
          openRenameModal({
            title: 'Изменение адреса',
            value: party.address || '',
            existingValues: addresses,
            duplicateMessage: (value) =>
              `Филиал "${value}" стороны "${party.name}" уже существует`,
            onConfirm(value) {
              return updateParty(party.id, 'address', value);
            },
          });
        },
        onAddressArchive: () => {},
        onAddressDelete: (id: number) =>
          nodeWithAddress && deleteParty(nameNode.parties[id].id),
        onArchive: () => {},
        onAddressPick: onPick,
        onDelete: () => !nodeWithAddress && deleteParty(nameNode.party.id),
        onPick: () => !nodeWithAddress && onPick(nameNode.party),
      };
    },
  };

  return {
    categoriesTree,
    renameModal,
    pickCategoryModal,
    handler,
    handleCategoryAdd,
    closeRenameModal,
    closePickCategoryModal: () => setPickCategoryModal(null),
  };
};
