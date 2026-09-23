import { PartyType } from '@/shared/types/party';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon, IconButton, Menu, Text, useTheme } from 'react-native-paper';

type CategoryItemSingleProps = {
  party: PartyType & { id: string };
  active: boolean;
  onPress: () => void;
  onRename: () => void;
  onChangeCategory: () => void;
  onAddressAdd: () => void;
  onArchive: () => void;
  onDelete: () => void;
  onPick: () => void;
};

export const CategoryItemSingle = (props: CategoryItemSingleProps) => {
  const { styles, theme } = useStylesCategoryItem();
  const [menuOpen, setMenuOpen] = useState(false);
  const { party, active, onPick } = props;

  return (
    <View style={styles.rowContainer}>
      <TouchableOpacity
        style={{
          ...styles.touchableOpacity,
        }}
        onPress={props.onPress}
      >
        <Icon
          source={
            active ? 'checkbox-blank-circle' : 'checkbox-blank-circle-outline'
          }
          color={theme.colors.onSecondaryContainer}
          size={12}
        />
        <Text
          style={styles.touchableOpacityTitle}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {party.name}
        </Text>
      </TouchableOpacity>
      {active && (
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <ItemMenuButton {...props} />
          <IconButton
            icon={'check'}
            size={20}
            style={{ margin: 0 }}
            onPress={onPick}
          />
        </View>
      )}
    </View>
  );
};

const useStylesCategoryItem = () => {
  const theme = useTheme();
  return {
    styles: StyleSheet.create({
      rowContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.onSecondary,
        borderRadius: 10,
      },
      touchableOpacity: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        padding: 10,
        flexShrink: 1,
        flexGrow: 1,
      },
      touchableOpacityTitle: {
        flexShrink: 1,
        ...theme.fonts.titleSmall,
        color: theme.colors.onSecondaryContainer,
      },
    }),
    theme,
  };
};

const ItemMenuButton = (
  props: Exclude<CategoryItemSingleProps, 'party' | 'active' | 'onPress'>,
) => {
  const theme = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Menu
      theme={theme}
      visible={menuOpen}
      onDismiss={() => setMenuOpen(false)}
      anchor={
        <IconButton
          onPress={() => setMenuOpen(true)}
          icon={'dots-vertical'}
          size={20}
          style={{ margin: 0 }}
        />
      }
    >
      <Menu.Item
        leadingIcon={() => <Icon source={'pencil'} size={20} />}
        title={'Переименовать'}
        titleStyle={theme.fonts.titleSmall}
        onPress={() => {
          setMenuOpen(false);
          props.onRename();
        }}
      />
      <Menu.Item
        leadingIcon={() => <Icon source={'swap-horizontal'} size={20} />}
        title={'Сменить категорию'}
        titleStyle={theme.fonts.titleSmall}
        onPress={() => {
          setMenuOpen(false);
          props.onChangeCategory();
        }}
      />
      <Menu.Item
        leadingIcon={() => <Icon source={'home-plus'} size={20} />}
        title={'Добавить филиал'}
        titleStyle={theme.fonts.titleSmall}
        onPress={() => {
          setMenuOpen(false);
          props.onAddressAdd();
        }}
      />
      <Menu.Item
        leadingIcon={() => <Icon source={'archive'} size={20} />}
        title={'Архивировать'}
        titleStyle={theme.fonts.titleSmall}
        onPress={() => {
          setMenuOpen(false);
          props.onArchive();
        }}
      />
      <Menu.Item
        leadingIcon={() => <Icon source={'delete'} size={20} color="red" />}
        title={'Удалить'}
        titleStyle={{ ...theme.fonts.titleSmall, color: 'red' }}
        onPress={() => {
          setMenuOpen(false);
          props.onDelete();
        }}
      />
    </Menu>
  );
};
