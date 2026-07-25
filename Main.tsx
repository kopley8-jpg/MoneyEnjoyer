import App from "@/app/App"
import { GoogleOneTapSignIn } from "react-native-nitro-google-signin"
import { MD3DarkTheme, PaperProvider } from "react-native-paper"
import { ThemeProp } from "react-native-paper/lib/typescript/types"
import { SafeAreaView } from "react-native-safe-area-context"

const theme: ThemeProp = {
  ...MD3DarkTheme,
}

GoogleOneTapSignIn.configure({ webClientId: "autoDetect" })

const Main = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors?.background }} edges={["top", "bottom"]}>
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    </SafeAreaView>
  )
}

export default Main