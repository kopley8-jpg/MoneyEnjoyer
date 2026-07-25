import App from "@/app/App"
import { MD3DarkTheme, PaperProvider } from "react-native-paper"
import { ThemeProp } from "react-native-paper/lib/typescript/types"

const theme: ThemeProp = {
  ...MD3DarkTheme,
}

const Main = () => {
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  )
}

export default Main