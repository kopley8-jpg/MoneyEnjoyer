import { StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, Text, useTheme } from 'react-native-paper';

export const CategoryListItem = ({
  item,
  active,
  onPress,
}: {
  item: string;
  active: boolean;
  onPress: () => void;
}) => {
  const styles = useStyles();
  return (
    <TouchableOpacity style={styles.rowContainer} onPress={onPress}>
      <Text style={styles.title}>{item}</Text>
      {active && <Icon source={'check'} size={20} />}
    </TouchableOpacity>
  );
};

const useStyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    rowContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 7,
    },
    title: theme.fonts.titleMedium,
  });
};
