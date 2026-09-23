import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon, IconButton, Menu, Text, useTheme } from 'react-native-paper';
import { AddressItem } from './AddressItem/AddressItem';
import { WithAddressNode } from '@/widgets/parties-browser/model/types/CategoryTree';
import { PartyWithId } from '@/shared/types/party';

type CategoryItemFolderProps = {
  item: WithAddressNode;
  expanded: boolean;
  onPress: () => void;
  onRename: () => void;
  onChangeCategory: () => void;
  onAddressAdd: () => void;
  onAddressRename: (addressId: number) => void;
  onAddressArchive: (addressId: number) => void;
  onAddressDelete: (addressId: number) => void;
  onAddressPick: (party: PartyWithId) => void;
};

export const CategoryItemFolder = (props: CategoryItemFolderProps) => {
  const styles = useStylesCategoryItemFolder();
  const { expanded } = props;
  const { name, parties } = props.item;
  const [activeAddressId, setActiveAddressId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View
        style={{ ...styles.rowContainer, borderBottomWidth: expanded ? 1 : 0 }}
      >
        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={props.onPress}
        >
          <Icon source={expanded ? 'menu-down' : 'menu-right'} size={20} />
          <Text
            style={styles.touchableOpacityTitle}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {name + ` (${parties.length})`}
          </Text>
        </TouchableOpacity>
        {expanded && (
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <ItemFolderMenuButton {...props} />
            <IconButton
              icon={'plus'}
              size={20}
              style={{ margin: 0 }}
              onPress={props.onAddressAdd}
            />
          </View>
        )}
      </View>
      {expanded && (
        <View style={styles.list}>
          {parties.map((party, index) => (
            <AddressItem
              key={party.id}
              item={party}
              checked={party.id === activeAddressId}
              onPress={() => setActiveAddressId(party.id)}
              onRename={() => props.onAddressRename(index)}
              onArchive={() => props.onAddressArchive(index)}
              onDelete={() => props.onAddressDelete(index)}
              onPick={() => props.onAddressPick(party)}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const useStylesCategoryItemFolder = () => {
  const theme = useTheme();
  return StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: theme.colors.onSecondary,
      borderRadius: 10,
    },
    rowContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomColor: theme.colors.onSecondaryContainer,
      borderBottomWidth: 1,
    },
    touchableOpacity: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      flexShrink: 1,
      flexGrow: 1,
    },
    touchableOpacityTitle: {
      ...theme.fonts.titleSmall,
      color: theme.colors.onSecondaryContainer,
      flexShrink: 1,
    },
    list: {
      padding: 10,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      gap: 8,
    },
  });
};

const ItemFolderMenuButton = (
  props: Exclude<CategoryItemFolderProps, 'item' | 'expanded' | 'onPress'>,
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
    </Menu>
  );
};
