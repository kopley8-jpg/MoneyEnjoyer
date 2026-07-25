import { EarnsScreen } from "@/screens/EarnsScreen/EarnsScreen"
import { SpendingsScreen } from "@/screens/SpendingsScreen/SpendingsScreen"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { useTheme } from "react-native-paper"


const Tab = createBottomTabNavigator()

export const Tabs = () => {

  const theme = useTheme()

  return (
    <Tab.Navigator screenOptions={{
      headerStyle: { backgroundColor: theme.colors.secondaryContainer },
      headerTintColor: theme.colors.primary,
      tabBarStyle: { backgroundColor: theme.colors.secondaryContainer }
    }}>
      <Tab.Screen name="Earns" component={EarnsScreen} />
      <Tab.Screen name="Spends" component={SpendingsScreen} />
    </Tab.Navigator>
  )
}