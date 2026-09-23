import { useSessionStore } from '@/entities/session/model/sessionStore';
import { database } from '@/shared/api/firebase/database';
import { Balance } from '@/shared/types/user';
import { onValue, ref } from '@react-native-firebase/database';
import { useEffect, useState } from 'react';

export const useBalance = () => {
  const uid = useSessionStore((state) => state.firebaseUser?.uid);
  const [balance, setBalance] = useState<Balance>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) {
      setBalance({});
      setLoading(true);
      return;
    }

    const balanceRef = ref(database, `users/${uid}/businessData/balance`);
    const unsubscribe = onValue(
      balanceRef,
      (snapshot) => {
        setBalance(snapshot.exists() ? snapshot.val() : {});
        setLoading(false);
      },
      (error) => {
        console.log('firebase balance querry error (useBalance): ' + error);
        setLoading(false);
      },
    );

    return unsubscribe;
  }, []);

  return { balance, loading };
};
