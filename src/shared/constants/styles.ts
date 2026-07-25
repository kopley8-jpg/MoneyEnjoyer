import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';

export const useScreenContainerStyles = (): StyleProp<ViewStyle> => {
  const theme = useTheme();

  return {
    flex: 1,
    backgroundColor: theme.colors.background,
  };
};
