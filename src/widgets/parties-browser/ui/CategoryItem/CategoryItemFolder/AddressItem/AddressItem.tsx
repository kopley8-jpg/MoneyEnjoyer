import { PartyType } from '@/shared/types/party';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon, IconButton, Menu, Text, useTheme } from 'react-native-paper';

type AddressItemProps = {
  item: PartyType;
  onPress: () => void;
  onRename: () => void;
  onArchive: () => void;
  onDelete: () => void;
  onPick: () => void;
  checked: boolean;
};

export const AddressItem = (props: AddressItemProps) => {
  const { styles, theme } = useStylesAddressItem();
  const [menuOpen, setMenuOpen] = useState(false);
  const { checked, onPress, item } = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          ...styles.touchableOpacity,
        }}
        onPress={() => onPress()}
      >
        <Icon
          source={
            checked ? 'checkbox-blank-circle' : 'checkbox-blank-circle-outline'
          }
          color={theme.colors.onSecondaryContainer}
          size={12}
        />
        <Text
          style={styles.touchableOpacityTitle}
          numberOfLines={3}
          ellipsizeMode="tail"
        >
          {item.address ? item.address : 'Без адреса'}
        </Text>
      </TouchableOpacity>
      {checked && (
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <AddressItemMenuButton {...props} />
          <IconButton
            icon={'check'}
            size={20}
            style={{ margin: 0 }}
            onPress={props.onPick}
          />
        </View>
      )}
    </View>
  );
};

const useStylesAddressItem = () => {
  const theme = useTheme();
  return {
    styles: StyleSheet.create({
      container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.secondaryContainer,
        borderRadius: 10,
      },
      touchableOpacity: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 10,
        paddingVertical: 6,
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

const AddressItemMenuButton = (
  props: Exclude<AddressItemProps, 'item' | 'onPress' | 'checked'>,
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
