import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Modal, Portal, useTheme } from 'react-native-paper';
import { registerTranslation, ru } from 'react-native-paper-dates';
import { Change, DraftTransactionType } from './model/types';

registerTranslation('ru', ru);

type AddTransactionModalProps = {
  visible: boolean;
  onDismiss: () => void;
};

export const AddTransactionModal = (props: AddTransactionModalProps) => {
  const { styles, theme } = useStyles();
  
  const [transaction, setTransaction] = useState<DraftTransactionType>({
    type: 'spend',
    serialNumber: null,
    date: new Date(Date.now()),
    party: null,
    value: null,
    positions: [],
    summ: null,
    paymentWay: null,
  });

  const handleChange = ({ entry, value }: Change) => {
    setTransaction((prev) => ({ ...prev, [entry]: value }));
  };

  return (
    <Portal>
      <Modal
        {...props}
        style={{ alignItems: 'center' }}
        contentContainerStyle={styles.container}
      >
        <View
          style={{ width: 100, height: 100, backgroundColor: 'red' }}
          onTouchEnd={() => console.log(theme.fonts)}
        />
      </Modal>
    </Portal>
  );
};

const useStyles = () => {
  const theme = useTheme();
  return {
    styles: StyleSheet.create({
      container: {
        backgroundColor: theme.colors.onSecondary,
        maxHeight: '50%',
        maxWidth: '65%',
        flexDirection: 'column',
        alignItems: 'stretch',
        borderRadius: 15,
      },
      header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 14,
      },
    }),
    theme,
  };
};
