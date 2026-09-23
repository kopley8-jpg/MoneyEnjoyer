import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Divider,
  Modal,
  Portal,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';

export const RenameModal = ({
  visible,
  value: inputValue,
  title,
  error,
  onChangeComplete,
  onDismiss,
}: {
  title: string;
  value: string;
  visible: boolean;
  error: string | null;
  onDismiss: () => void;
  onChangeComplete: (newValue: string) => void;
}) => {
  const [value, setValue] = useState(inputValue);
  const styles = useStylesRenameModal();
  const theme = useTheme();

  useEffect(() => {
    setValue(inputValue);
  }, [inputValue]);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modal}
      >
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <TextInput
            value={value}
            mode="flat"
            error={Boolean(error)}
            onChangeText={(text) => {
              setValue(text);
            }}
            style={styles.input}
          />
          {error && <Text style={styles.errorText}>{error}</Text>}
          <View style={styles.buttonsContainer}>
            <Button mode="text" onPress={() => onDismiss()}>
              Отмена
            </Button>
            <Divider />
            <Button
              onPress={() => {
                onChangeComplete(value);
              }}
              mode="text"
              disabled={value === inputValue}
            >
              Подтвердить
            </Button>
          </View>
        </View>
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
    container: {
      borderRadius: 10,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: theme.colors.surface,
      alignSelf: 'center',
      padding: 10,
      width: '60%', // или конкретное значение
      maxWidth: 400, // чтобы не разъезжалось на планшетах/десктопе
      gap: 3,
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
