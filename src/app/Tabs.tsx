import { EarnsScreen } from "@/screens/EarnsScreen/EarnsScreen"
import { SpendingsScreen } from "@/screens/SpendingsScreen/SpendingsScreen"
import { BottomTabBar, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { View } from "react-native"
import { useTheme } from "react-native-paper"

const Tab = createBottomTabNavigator()

export const Tabs = () => {
  const theme = useTheme()

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.background },
        headerShadowVisible: false,
        headerTintColor: theme.colors.primary,
        tabBarStyle: {
          backgroundColor: theme.colors.secondaryContainer,
          height: 80,
          borderTopColor: "rgba(0,0,0,0)",
          borderRadius: 30,
        },
      }}
      tabBar={(props) => (
        <TabBarContainer>
          <BottomTabBar
            {...props}
          />
        </TabBarContainer>
      )}
    >
      <Tab.Screen name="Earns" component={EarnsScreen} />
      <Tab.Screen name="Spends" component={SpendingsScreen} />
    </Tab.Navigator>
  )
}

const TabBarContainer = ({ children }: { children: React.ReactNode }) => {

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        alignItems: "center"
      }}>
      <View
        style={{
          width: "90%",
        }}>
        {children}
      </View>
    </View>
  )
}