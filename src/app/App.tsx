import React, { useEffect } from "react"
import { MD3DarkTheme, PaperProvider, } from 'react-native-paper';
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ThemeProp } from "react-native-paper/lib/typescript/types"
import { RootStackNavigator } from "./navigator/RootStackNavigator/RootStackNavigator";
import { initAuthListener } from "@/entities/session/model/initAuthListener";

const theme: ThemeProp = {
  ...MD3DarkTheme,
}


const App = () => {
  useEffect(() => {
    const unsubscribe = initAuthListener()
    return unsubscribe
  }, [])
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <RootStackNavigator />
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  )
}

export default App