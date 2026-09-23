import { typedEntries } from '@/shared/lib/typedEntries';
import { useState } from 'react';
import { CreatePartyModalProps } from './types';
import { PartyType } from '@/shared/types/transaction';
import { addParty } from '../../../model/addParty';

export const useCreatePartyModal = (props: CreatePartyModalProps) => {
  const { onDismiss, onCreate } = props;
  const [entries, setEntries] = useState<
    Record<(typeof ENTRIES)[number], string>
  >({
    category: '',
    name: '',
    address: '',
  });
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState<{
    message: string;
    entries: (typeof ENTRIES)[number][];
  } | null>(null);

  const handleChange = (entry: (typeof ENTRIES)[number], value: string) => {
    setEntries((prev) => ({ ...prev, [entry]: value }));
  };

  const handleConfirm = async () => {
    const emptyEntries = typedEntries(entries)
      .filter(([key, value]) => value === '' && key !== 'address')
      .map(([key]) => key);

    if (emptyEntries.length > 0) {
      setError({
        message: 'Заполните все обязательные поля',
        entries: emptyEntries,
      });
      return;
    }

    try {
      const newParty: PartyType = {
        ...entries,
      };
      const newPartyRef = await addParty(newParty);
      if (newPartyRef) {
        onCreate?.(newPartyRef, newParty);
        onDismiss();
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : typeof error === 'string'
          ? error
          : 'Не удалось создать сторону';
      setError({ message, entries: [] });
    }
  };

  return { entries, error, disabled, handleChange, handleConfirm };
};

export const ENTRIES = ['category', 'name', 'address'] as const;
