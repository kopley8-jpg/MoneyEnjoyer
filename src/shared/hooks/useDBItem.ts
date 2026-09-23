import { onValue, ref } from '@react-native-firebase/database';
import { useEffect, useState } from 'react';
import { database } from '../api/firebase/database';

export const useDBItem = <T>(path: string | null) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!path) {
      setData(null);
      setLoading(false);
      return;
    }
    const partiesRef = ref(database, path);
    const unsubscribe = onValue(
      partiesRef,
      (snapshot) => {
        setLoading(true);
        setData(snapshot.exists() ? snapshot.val() : null);
        setLoading(false);
      },
      (error) => {
        console.log('useDBItem error. Querry:' + path + ', error: ' + error);
        setLoading(false);
      },
    );
    return unsubscribe;
  }, [path]);

  return { loading, data };
};
