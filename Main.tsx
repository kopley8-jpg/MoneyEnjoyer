import App from "@/app/App"
import { getDatabase, setPersistenceEnabled } from "@react-native-firebase/database"
import { GoogleOneTapSignIn } from "react-native-nitro-google-signin"

GoogleOneTapSignIn.configure({ webClientId: "autoDetect" })
setPersistenceEnabled(getDatabase(), true)

const Main = () => {
  return (
    <App />
  )
}

export default Main