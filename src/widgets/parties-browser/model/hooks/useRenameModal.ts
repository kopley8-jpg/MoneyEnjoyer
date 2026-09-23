// widgets/parties-browser/model/useRenameModal.ts
import { useState } from 'react';
import { getErrorMessage } from '@/shared/lib/getErrorMessage';
import { ToastAndroid } from 'react-native';

type OpenParams = {
  title: string;
  value: string;
  existingValues: string[]; // с чем сверяем на дубль
  duplicateMessage: (value: string) => string;
  onConfirm: (value: string) => Promise<unknown> | void;
};

export const useRenameModal = () => {
  const [state, setState] = useState<{
    visible: true;
    title: string;
    value: string;
    error: string | null;
    onChangeComplete: (newValue: string) => void;
  } | null>(null);

  const open = ({
    title,
    value,
    existingValues,
    duplicateMessage,
    onConfirm,
  }: OpenParams) => {
    setState({
      visible: true,
      title,
      value,
      error: null,
      onChangeComplete: (newValue) => {
        if (existingValues.includes(newValue)) {
          setState(
            (prev) => prev && { ...prev, error: duplicateMessage(newValue) },
          );
          return;
        }
        setState(null);
        Promise.resolve(onConfirm(newValue)).catch((error) => {
          const message = getErrorMessage(error);
          ToastAndroid.show(
            `Не удалось сохранить: ${message}`,
            ToastAndroid.SHORT,
          );
        });
      },
    });
  };

  return {
    renameModal: state,
    openRenameModal: open,
    closeRenameModal: () => setState(null),
  };
};
