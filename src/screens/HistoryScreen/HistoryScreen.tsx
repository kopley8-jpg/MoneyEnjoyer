import { useSessionStore } from '@/entities/session/model/sessionStore';
import { database } from '@/shared/api/firebase/database';
import { useScreenContainerStyles } from '@/shared/constants/styles';
import { get, ref } from '@react-native-firebase/database';
import { StyleSheet, View } from 'react-native';

export const HistoryScreen = () => {
  const styles = {
    ...useStyles(),
    container: { ...useScreenContainerStyles(), ...useStyles().container },
  };
  const { firebaseUser } = useSessionStore((state) => state);

  return <View style={styles.container}></View>;
};

const useStyles = () => {
  return StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};
