import { StyleSheet, View } from 'react-native';
import {
  Button,
  Icon,
  List,
  Menu,
  Modal,
  Portal,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import { CreatePartyModalProps } from './model/types';
import { ENTRIES, useCreatePartyModal } from './model/useCreatePartyModal';
import { typedEntries } from '@/shared/lib/typedEntries';
import { useParties } from '@/entities/party/model/useParties';
import { PartyType } from '@/shared/types/transaction';
import { groupBy } from '@/shared/lib/groupBy';

type LocalPartiesType = {};

export const CreatePartyModal = (props: CreatePartyModalProps) => {
  const styles = useStyles();
  const { transactionType } = props;
  const { loading, parties: recordParties } = useParties();

  const parties = Object.values(recordParties);

  const categoriesTree: {
    category: string;
    names: { name: string; parties: PartyType[] }[];
  }[] = typedEntries(groupBy(parties, ({ category }) => category)).map(
    ([category, parties]) => ({
      category,
      names: typedEntries(groupBy(parties, ({ name }) => name)).map(
        ([key, value]) => ({ name: key, parties: value }),
      ),
    }),
  );

  return (
    <Portal>
      <Modal
        contentContainerStyle={styles.container}
        style={{ alignItems: 'center' }}
        {...props}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            {`Создание ${
              transactionType
                ? transactionType === 'earn'
                  ? 'отправителя'
                  : 'получателя'
                : 'стороны'
            }`}
          </Text>
        </View>
      </Modal>
    </Portal>
  );
};

const translate: Record<(typeof ENTRIES)[number], string> = {
  category: 'Категория',
  name: 'Название',
  address: 'Адрес (опционально)',
};

const useStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors.secondaryContainer,
      width: '60%',
      maxHeight: '40%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'flex-start',

      borderRadius: 10,
    },
    header: {
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.onSecondaryContainer,
      height: 40,

      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      padding: 8,
      gap: 8,
      display: 'flex',
      flexDirection: 'column',
    },
    headerTitle: theme.fonts.titleMedium,
    input: {
      flexGrow: 0,
      flexShrink: 0,
    },
    errorText: {
      ...theme.fonts.labelSmall,
      textAlign: 'center',
      color: theme.colors.error,
    },
  });
};
