import { useSessionStore } from '@/entities/session/model/sessionStore';
import { useDbList } from '@/shared/hooks/useDB';
import { PartyType } from '@/shared/types/party';

export const useParties = () => {
  const uid = useSessionStore((state) => state.firebaseUser?.uid);
  const { data: parties, loading } = useDbList<PartyType>(
    uid ? `users/${uid}/businessData/parties` : null,
  );

  return { parties, loading };
};
