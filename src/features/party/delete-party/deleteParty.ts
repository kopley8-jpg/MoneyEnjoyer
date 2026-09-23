import { useSessionStore } from '@/entities/session/model/sessionStore';
import { database } from '@/shared/api/firebase/database';
import { getErrorMessage } from '@/shared/lib/getErrorMessage';
import { ref, remove } from '@react-native-firebase/database';
import { ToastAndroid } from 'react-native';

export const deleteParty = async (id: string) => {
  const uid = useSessionStore.getState().firebaseUser?.uid;
  if (!uid) return;

  const partyRef = ref(database, `users/${uid}/businessData/parties/${id}`);
  try {
    await remove(partyRef);
  } catch (error) {
    const message = getErrorMessage(error);
    ToastAndroid.show(`Не удалось сохранить: ${message}`, ToastAndroid.SHORT);
  }
};
