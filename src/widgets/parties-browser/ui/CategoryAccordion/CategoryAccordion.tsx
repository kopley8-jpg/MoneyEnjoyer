import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon, IconButton, Text, useTheme } from 'react-native-paper';

export const CategoryAccordion = ({
  category,
  firstExpanded,
  firstRename,
  children,
  onRename,
  onAdd,
}: {
  category: string;
  firstExpanded?: boolean;
  firstRename?: boolean;
  children?: (
    activeItemId: number | null,
    setActiveItemId: (id: number | null) => void,
  ) => React.ReactNode;
  onRename: () => void;
  onAdd: () => void;
}) => {
  const styles = useStylesAccordion();
  const [expanded, setExpanded] = useState(
    firstExpanded ? firstExpanded : false,
  );
  const theme = useTheme();
  const [activeItemId, setActiveItemId] = useState<number | null>(null);

  return (
    <View style={styles.container}>
      <View
        style={{ ...styles.rowContainer, borderBottomWidth: expanded ? 1 : 0 }}
      >
        <TouchableOpacity
          style={{ ...styles.touchableOpacity, padding: expanded ? 3 : 5 }}
          onPress={() => setExpanded(!expanded)}
        >
          <Icon
            source={expanded ? 'menu-down' : 'menu-right'}
            size={28}
            color={theme.colors.onSecondaryContainer}
          />
          <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">
            {category}
          </Text>
        </TouchableOpacity>
        {expanded && (
          <>
            <IconButton
              icon={'pencil'}
              iconColor={theme.colors.onSurface}
              onPress={() => {
                onRename?.();
              }}
              size={20}
            />
            <IconButton
              icon={'plus'}
              iconColor={theme.colors.onSurface}
              size={20}
              onPress={onAdd}
            />
          </>
        )}
      </View>
      {expanded && (
        <View style={styles.partiesContainer}>
          {children?.(activeItemId, (id) => setActiveItemId(id))}
        </View>
      )}
    </View>
  );
};

const useStylesAccordion = () => {
  const theme = useTheme();
  return StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: theme.colors.secondaryContainer,
      borderRadius: 15,
    },
    rowContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'stretch',
      justifyContent: 'space-evenly',
      flexShrink: 1,
      borderCurve: 'circular',
      borderColor: theme.colors.onSecondaryContainer,
    },
    touchableOpacity: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      flexShrink: 1,
    },
    text: {
      flexShrink: 1,
      ...theme.fonts.titleSmall,
      color: theme.colors.onSecondaryContainer,
    },
    partiesContainer: {
      display: 'flex',
      flexDirection: 'column',
      overflow: 'scroll',
      padding: 7,
      gap: 7,
    },
  });
};
