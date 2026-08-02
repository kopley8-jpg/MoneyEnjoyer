import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { SessionStoreType } from './types';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useSessionStore = create<SessionStoreType>()(
  immer((set) => ({
    firebaseUser: null,
    user: null,
    initializating: true,
    isRegistering: false,

    setFirebaseUser: (firebaseUser) => {
      set({ firebaseUser });
    },
    setInitializating(initializating) {
      set({ initializating });
    },
    setIsRegistering: (isRegistering) => {
      set({ isRegistering });
    },
  })),
);
