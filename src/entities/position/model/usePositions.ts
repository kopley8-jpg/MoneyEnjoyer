import { useSessionStore } from '@/entities/session/model/sessionStore';
import { useDbList } from '@/shared/hooks/useDB';
import { PositionType } from '@/shared/types/position';

export const usePositions = () => {
  const uid = useSessionStore((state) => state.firebaseUser?.uid);
  const { data: positions, loading } = useDbList<PositionType>(
    uid ? `users/${uid}/positions` : null,
  );
  return { positions, loading };
};
