import { StyleSheet } from 'react-native';

export const useStyles = () => {
  return StyleSheet.create({
    container: {
      gap: 15,
    },
    input: {
      width: '80%',
      flexGrow: 0,
      flexShrink: 0,
    },
  });
};
