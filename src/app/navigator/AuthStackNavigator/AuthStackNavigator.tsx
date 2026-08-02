import { LoginScreen } from "@/screens/LoginScreen/LoginScreen"
import { RegisterWithEmailScreen } from "@/screens/RegisterWithEmailScreen/RegisterWithEmailScreen"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useTheme } from "react-native-paper"


const AuthStack = createNativeStackNavigator()

export const AuthStackNavigator = () => {
  const theme = useTheme()

  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterWithEmailScreen} />
    </AuthStack.Navigator>
  )
}