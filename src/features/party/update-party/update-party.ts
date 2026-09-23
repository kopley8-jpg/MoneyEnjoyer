import { useSessionStore } from '@/entities/session/model/sessionStore';
import { database } from '@/shared/api/firebase/database';
import { PartyType } from '@/shared/types/transaction';
import { getAuth } from '@react-native-firebase/auth';
import { get, ref, update } from '@react-native-firebase/database';

export const updateParty = async <K extends keyof PartyType>(
  id: string,
  entry: K,
  value: PartyType[K],
) => {
  const uid = useSessionStore.getState().firebaseUser?.uid;
  if (!uid) {
    return;
  }

  const partyRef = ref(database, `users/${uid}/businessData/parties/${id}`);
  console.log('updateParty BEFORE update');
  await update(partyRef, { [entry]: value });
  console.log('updateParty AFTER update - SUCCESS');
};
