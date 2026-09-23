import { ToastAndroid } from 'react-native';

export const showErrorToast = (message: string) => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};
