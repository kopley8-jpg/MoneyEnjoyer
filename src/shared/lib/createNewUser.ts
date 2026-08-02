import { UserType } from '../types/User';

export const createNewUser = (email: string, displayName: string): UserType => {
  return {
    profile: {
      displayName: displayName,
      email: email,
      photoURL: '',
      createdAt: Date.now(),
    },
    businessData: {
      parties: {},
      transactions: {},
      balance: {},
    },
  };
};
