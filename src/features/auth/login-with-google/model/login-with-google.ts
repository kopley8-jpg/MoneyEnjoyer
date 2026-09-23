// src/entities/session/model/signInWithGoogle.ts
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from '@react-native-firebase/auth';
import {
  GoogleOneTapSignIn,
  isNoSavedCredentialFoundResponse,
  isSuccessResponse,
} from 'react-native-nitro-google-signin';

export const signInWithGoogle = async () => {
  await GoogleOneTapSignIn.checkPlayServices();

  let response = await GoogleOneTapSignIn.signIn();

  if (isNoSavedCredentialFoundResponse(response)) {
    response = await GoogleOneTapSignIn.createAccount();
  }
  if (isNoSavedCredentialFoundResponse(response)) {
    response = await GoogleOneTapSignIn.presentExplicitSignIn();
  }

  if (!isSuccessResponse(response)) {
    throw new Error('Google Sign-In was cancelled or failed');
  }

  const idToken = response.data?.idToken;
  if (!idToken) {
    throw new Error('Missing idToken from Google Sign-In');
  }

  const googleCredential = GoogleAuthProvider.credential(idToken, null as any);
  await signInWithCredential(getAuth(), googleCredential);
};
