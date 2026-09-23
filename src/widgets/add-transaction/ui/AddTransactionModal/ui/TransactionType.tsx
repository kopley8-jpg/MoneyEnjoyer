import { StyleSheet, View } from 'react-native';
import { Icon, Text, TouchableRipple, useTheme } from 'react-native-paper';

export const TransactionType = (props: {
  type: 'earn' | 'spend';
  onPress: () => void;
}) => {
  const { type, onPress } = props;
  const { styles, theme } = useStyles();

  return (
    <TouchableRipple onPress={onPress}>
      <View style={styles.container}>
        <Icon
          source={'cash-minus'}
          size={24}
          color={theme.colors.onSecondaryContainer}
        />
        <Text style={styles.text}>{type === 'earn' ? 'Доход' : 'Расход'}</Text>
      </View>
    </TouchableRipple>
  );
};

const useStyles = () => {
  const theme = useTheme();
  return {
    styles: StyleSheet.create({
      container: {
        backgroundColor: theme.colors.secondaryContainer,
        paddingVertical: 4,
        paddingHorizontal: 6,
        gap: 7,
      },
      text: {
        ...theme.fonts.titleMedium,
        color: theme.colors.onSecondaryContainer,
      },
    }),
    theme,
  };
};
