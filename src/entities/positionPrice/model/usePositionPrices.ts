import { useSessionStore } from '@/entities/session/model/sessionStore';
import { useDbList } from '@/shared/hooks/useDB';
import { PositionPrice } from '@/shared/types/positionPrice';
import { useEffect, useState } from 'react';

export const usePositionPrices = () => {
  const uid = useSessionStore((state) => state.firebaseUser?.uid);

  const { data: prices, loading } = useDbList<PositionPrice>(
    uid ? `users/${uid}/positionPrices` : null,
  );
  return { prices, loading };
};
