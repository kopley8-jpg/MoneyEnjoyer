import { useSessionStore } from '@/entities/session/model/sessionStore';
import { database } from '@/shared/api/firebase/database';
import { PartyType } from '@/shared/types/transaction';
import { push, ref, set } from '@react-native-firebase/database';

export const addParty = async (newParty: PartyType): Promise<string | null> => {
  const uid = useSessionStore.getState().firebaseUser?.uid;
  if (!uid) return null;

  const partiesRef = ref(database, `users/${uid}/businessData/parties`);
  try {
    const newPartyRef = await push(partiesRef, newParty);
    return newPartyRef.key;
  } catch (error) {
    console.error('Ошибка при создании стороны:', error);
    throw error;
  }
};
