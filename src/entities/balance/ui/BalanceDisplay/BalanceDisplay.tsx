import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useBalance } from '../../model/useBalance';
import { typedEntries } from '@/shared/lib/typedEntries';

export const BalanceDisplay = () => {
  const styles = useStyles();
  const { balance, loading } = useBalance();

  const entries = Object.entries(balance);

  return (
    <View>
      {entries.length > 0 ? (
        entries.map(([val, amount]) => (
          <Text style={styles.title} key={val}>{`${val} ${amount}`}</Text>
        ))
      ) : (
        <Text>Баланс пуст</Text>
      )}
    </View>
  );
};

const useStyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    container: {},
    title: {
      fontSize: 18,
    },
  });
};
