export type Handler = {
  handleTextInputChange: (key: keyof FormType) => {
    onChangeText: (text: string) => void;
  };
  button: {
    onPress: () => void;
  };
};

export type FormType = {
  displayName: string;
  email: string;
  password: string;
  repeatPassword: string;
};
