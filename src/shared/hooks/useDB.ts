import { onValue, ref } from '@react-native-firebase/database';
import { useEffect, useState } from 'react';
import { database } from '../api/firebase/database';
import z from 'zod';

export const useDb = <T>(path: string | null, schema: z.ZodType<T>) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (!path) {
      setLoading(false);
      return;
    }
    const unsub = onValue(
      ref(database, path),
      (snapshot) => {
        const result = schema.safeParse(snapshot.val());
        if (!result.success) {
          console.log('useDbValidationError' + result.error);
          setError(true);
          setLoading(false);
          return;
        }
        setData(result.data);
        setError(false);
        setLoading(false);
      },
      (error) => {
        console.error('useDB Firebase error:', error);
        setLoading(false);
        setError(true);
      },
    );
    return unsub;
  }, [path, schema]);
  return { data, loading, error };
};
