import { useTheme } from "react-native-paper"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { LoginScreen } from "@/screens/LoginScreen/LoginScreen"
import { RegisterWithEmailScreen } from "@/screens/RegisterWithEmailScreen/RegisterWithEmailScreen"
import { Tabs } from "../BottomTabNavigator/Tabs"
import { useSessionStore } from "@/entities/session/model/sessionStore"
import { AuthStackNavigator } from "../AuthStackNavigator/AuthStackNavigator"
import { getAuth, signOut } from "@react-native-firebase/auth"

const RootStack = createNativeStackNavigator()

export const RootStackNavigator = () => {
  const theme = useTheme()
  const { firebaseUser } = useSessionStore(state => state)
  const { initializating } = useSessionStore(state => state)


  if (initializating) return null

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.colors.background },
      }}
    >
      {firebaseUser ? (
        <RootStack.Screen name="Tabs" component={Tabs} />
      ) : (
        <RootStack.Screen name="Auth" component={AuthStackNavigator} />
      )}
    </RootStack.Navigator>
  )
}
