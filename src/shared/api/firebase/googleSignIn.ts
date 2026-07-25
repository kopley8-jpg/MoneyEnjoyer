import { getAuth, GoogleAuthProvider, signInWithCredential } from "@react-native-firebase/auth";
import { GoogleOneTapSignIn, isNoSavedCredentialFoundResponse, isSuccessResponse } from "react-native-nitro-google-signin";



export const startSignInFlow = async () => {
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

  // Создаём Firebase-credential из Google idToken и логинимся в Firebase
const googleCredential = GoogleAuthProvider.credential(idToken, null as any);
await signInWithCredential(getAuth(), googleCredential);
};

export const signOut = async () => {

};