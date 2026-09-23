import { Button } from "react-native-paper"
import { signInWithGoogle } from "../../model/login-with-google"


export const LoginWithGoogleButton = () => {

  return (
    <Button mode="contained" icon={"google"} onPress={signInWithGoogle}>
      Войти с Google
    </Button>
  )
}