import { useState } from 'react';
import { IconButton } from 'react-native-paper';
import { AddTransactionModal } from '../AddTransactionModal/AddTransactionModal';

export const AddTransactionButton = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <IconButton icon={'plus'} onPress={() => setVisible(true)} />
      <AddTransactionModal
        visible={visible}
        onDismiss={() => setVisible(false)}
      />
    </>
  );
};
