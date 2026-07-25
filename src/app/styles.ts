import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

export const useStyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      backgroundColor: theme.colors.background,
    },
  });
};
