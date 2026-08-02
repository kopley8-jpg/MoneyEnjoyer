import { UserType } from '@/shared/types/User';
import type { FirebaseAuthTypes } from '@react-native-firebase/auth';

export type SessionStateType = {
  firebaseUser: FirebaseAuthTypes.User | null;
  initializating: boolean;
  isRegistering: boolean;
};

export type SessionActionsType = {
  setFirebaseUser: (firebaseUser: FirebaseAuthTypes.User | null) => void;
  setInitializating: (initializating: boolean) => void;
  setIsRegistering: (registering: boolean) => void;
};

export type SessionStoreType = SessionStateType & SessionActionsType;
