import { useSessionStore } from '@/entities/session/model/sessionStore';
import { database } from '@/shared/api/firebase/database';
import { PartyType, PartyWithId } from '@/shared/types/party';
import { onValue, ref } from '@react-native-firebase/database';
import { useEffect, useState } from 'react';

export const useParty = (id: string) => {
  const uid = useSessionStore((state) => state.firebaseUser?.uid);
  const [party, setParty] = useState<PartyWithId | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!uid) {
      setParty(null);
      setLoading(false);
      return;
    }
    const partiesRef = ref(database, `users/${uid}/businessData/parties/${id}`);
    const unsubscribe = onValue(
      partiesRef,
      (snapshot) => {
        setLoading(true);
        setParty(snapshot.exists() ? snapshot.val() : {});
        setLoading(false);
      },
      (error) => {
        console.log('firebase party querry error (useParty): ' + error);
        setLoading(false);
      },
    );
    return unsubscribe;
  }, []);

  return { loading, party };
};
