import React from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';
import { CategoryAccordion } from './CategoryAccordion/CategoryAccordion';
import { CategoryItem } from './CategoryItem/CategoryItem';
import { RenameModal } from './RenameModal/RenameModal';
import { PickCategoryModal } from './PickCategoryModal/PickCategoryModal';
import { PartiesBrowserProps } from '../model/types';
import { usePartiesBrowser } from '../model/usePartiesBrowser';

export const PartiesBrowser = (props: PartiesBrowserProps) => {
  const { onGoBack } = props;

  const { styles, theme } = useStyles();

  const {
    categoriesTree,
    handler,
    renameModal,
    pickCategoryModal,
    handleCategoryAdd,
    closeRenameModal,
    closePickCategoryModal,
  } = usePartiesBrowser(props);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon={'arrow-left'}
          size={20}
          onPress={onGoBack}
          iconColor={theme.colors.onSecondaryContainer}
        />
        <Text style={styles.headerTitle}>Категории</Text>
        <IconButton
          icon={'plus'}
          size={20}
          onPress={handleCategoryAdd}
          iconColor={theme.colors.onSecondaryContainer}
        />
      </View>
      <FlatList
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        data={categoriesTree}
        renderItem={({ item: category }) => (
          <CategoryAccordion
            key={category.category}
            category={category.category}
            {...handler.categoryAccrodion(category)}
          >
            {(activeId, setActiveId) => (
              <>
                {category.names.map((nameNode, nameNodeId) => (
                  <CategoryItem
                    key={nameNode.name}
                    nameNode={nameNode}
                    active={activeId === nameNodeId}
                    onPress={() =>
                      setActiveId(activeId === nameNodeId ? null : nameNodeId)
                    }
                    {...handler.categoryItem(category, nameNode)}
                  />
                ))}
              </>
            )}
          </CategoryAccordion>
        )}
      />
      {renameModal && (
        <RenameModal {...renameModal} onDismiss={closeRenameModal} />
      )}
      {pickCategoryModal && (
        <PickCategoryModal
          {...pickCategoryModal}
          categories={categoriesTree.map((category) => category.category)}
          onDismiss={closePickCategoryModal}
        />
      )}
    </View>
  );
};

const useStyles = () => {
  const theme = useTheme();
  return {
    styles: StyleSheet.create({
      container: {
        display: 'flex',
        flexShrink: 1,
        flexGrow: 0,
      },
      header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: theme.colors.onSecondaryContainer,
        borderBottomWidth: 1,
      },
      headerTitle: {
        ...theme.fonts.titleSmall,
        color: theme.colors.onSecondaryContainer,
      },
      content: {
        paddingHorizontal: 10,
        flexShrink: 1,
        flexGrow: 0,
      },
      contentContainer: {
        gap: 5,
        paddingVertical: 10,
      },
    }),
    theme,
  };
};
