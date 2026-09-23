import { useSessionStore } from '@/entities/session/model/sessionStore';
import { getAuth, signOut } from '@react-native-firebase/auth';
import { useState } from 'react';
import {
  Button,
  Icon,
  IconButton,
  Menu,
  Text,
  useTheme,
} from 'react-native-paper';

export const SessionPopUpMenu = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <Menu
      visible={open}
      onDismiss={() => setOpen(false)}
      theme={theme}
      anchor={
        <IconButton
          icon={'account-circle'}
          iconColor={theme.colors.primary}
          onPress={() => setOpen(true)}
        />
      }
    >
      <Menu.Item
        leadingIcon={'account-cash'}
        onPress={() => {}}
        title="Аккаунт"
      />
      <Menu.Item leadingIcon={'cog'} onPress={() => {}} title="Настройки" />
      <Menu.Item
        leadingIcon={({ size }) => (
          <Icon source={'location-exit'} size={size} color="#ff1111" />
        )}
        rippleColor={'red'}
        onPress={async () => {
          await signOut(getAuth());
        }}
        titleStyle={{ color: '#ff1111' }}
        title="Выход"
      />
    </Menu>
  );
};
