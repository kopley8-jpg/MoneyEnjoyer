import { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import {
  IconButton,
  Menu,
  Modal,
  Portal,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import { CategoryListItem } from './CategoryListItem/CategoryListItem';
import { RenameModal } from '../RenameModal/RenameModal';

export const PickCategoryModal = ({
  visible,
  currentCategory,
  categories,
  onPick,
  onDismiss,
}: {
  visible: boolean;
  currentCategory: string;
  categories: string[];
  onDismiss: () => void;
  onPick: (category: string) => void;
}) => {
  const styles = useStylesRenameModal();
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const [renameModal, setRenameModal] = useState<{
    visible: true;
    error: string | null;
  } | null>(null);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modal}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <IconButton icon={'arrow-left'} onPress={onDismiss} size={20} />
            <Text style={styles.title}>{'Выберите категорию'}</Text>
            <IconButton
              icon={'plus'}
              onPress={() => setRenameModal({ visible: true, error: null })}
              size={20}
            />
          </View>
          {categories.length > 10 && (
            <TextInput style={styles.input} value="" mode="outlined" />
          )}
          <FlatList
            contentContainerStyle={{
              alignItems: 'stretch',
              display: 'flex',
              paddingHorizontal: 10,
              paddingVertical: 7,
            }}
            data={categories.filter((name) => name !== currentCategory)}
            renderItem={({ item, index }) => (
              <CategoryListItem
                key={index}
                item={item}
                active={activeCategoryId === index}
                onPress={() =>
                  activeCategoryId === index
                    ? onPick(item)
                    : setActiveCategoryId(index)
                }
              />
            )}
          />
        </View>
        {renameModal && (
          <RenameModal
            {...renameModal}
            title="Создание категории"
            value=""
            onChangeComplete={(text) => {
              if (categories.includes(text)) {
                setRenameModal(
                  (prev) =>
                    prev && {
                      ...prev,
                      error: `Категория "${text}" уже существует`,
                    },
                );
                return;
              }
              setRenameModal(null);
              onPick(text);
            }}
            onDismiss={() => setRenameModal(null)}
          />
        )}
      </Modal>
    </Portal>
  );
};

const useStylesRenameModal = () => {
  const theme = useTheme();

  return StyleSheet.create({
    modal: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    container: {
      borderRadius: 10,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: theme.colors.surface,
      width: '70%',
      alignSelf: 'center',
      maxWidth: 400, // чтобы не разъезжалось на планшетах/десктопе
    },
    input: {
      flexGrow: 0,
      flexShrink: 0,
      height: 45,
      width: '100%',
      backgroundColor: theme.colors.surface,
    },
    title: theme.fonts.titleMedium,
    errorText: {
      ...theme.fonts.titleSmall,
      color: theme.colors.error,
      alignSelf: 'center',
      textAlign: 'center',
    },
    buttonsContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
  });
};
