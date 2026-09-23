import { BalanceDisplay } from '@/entities/balance';
import { useScreenContainerStyles } from '@/shared/constants/styles';
import { StyleSheet, View } from 'react-native';

export const MainScreen = () => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <BalanceDisplay />
    </View>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    container: {
      ...useScreenContainerStyles(),
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      padding: '3%',
    },
  });
};
