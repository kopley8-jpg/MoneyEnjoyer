import { MainScreen } from "@/screens/MainScreen/MainScreen"
import { HistoryScreen } from "@/screens/HistoryScreen/HistoryScreen"
import { BottomTabBar, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Icon, useTheme } from "react-native-paper"
import { CustomButtomTabBar } from "./CustomBottomTabBar/CustomBottomTabBar"

const Tab = createBottomTabNavigator()

export const Tabs = () => {
  const theme = useTheme()

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.background },
        headerShadowVisible: false,
        headerTintColor: theme.colors.primary,
        tabBarIconStyle: { width: 26 },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant
      }}
      tabBar={props => (<CustomButtomTabBar {...props} />)}
    >
      <Tab.Screen name="Главная" component={MainScreen} options={{ tabBarIcon: ({ color, size }) => (<Icon source="home" color={color} size={size} />) }} />
      <Tab.Screen name="История" component={HistoryScreen} options={{ tabBarIcon: ({ color, size }) => <Icon source="cart" color={color} size={size} /> }} />
    </Tab.Navigator>
  )
}

