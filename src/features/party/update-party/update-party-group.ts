import { useSessionStore } from '@/entities/session/model/sessionStore';
import { database } from '@/shared/api/firebase/database';
import { PartyType } from '@/shared/types/transaction';
import { ref, update } from '@react-native-firebase/database';

export const updatePartyGroup = async <K extends keyof PartyType>(
  partyIds: string[], // все id party, у которых нужно поменять name
  entry: K,
  newValue: PartyType[K],
) => {
  const uid = useSessionStore.getState().firebaseUser?.uid;
  if (!uid) return;

  const updates: Record<string, PartyType[K]> = {};
  for (const id of partyIds) {
    updates[`users/${uid}/businessData/parties/${id}/${entry}`] = newValue;
  }

  try {
    await update(ref(database), updates); // один атомарный запрос на все party сразу
  } catch (error) {
    throw error;
  }
};
