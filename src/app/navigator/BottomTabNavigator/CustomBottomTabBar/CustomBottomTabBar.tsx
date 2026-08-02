import { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import { NavigationRoute, ParamListBase } from "@react-navigation/native"
import { useMemo } from "react"
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native"
import { Icon, MD3Theme, Text, TouchableRipple, useTheme } from "react-native-paper"

export const CustomButtomTabBar = (props: BottomTabBarProps) => {
  const styles = useStyles()

  return (
    <View style={styles.container}>
      {props.state.routes.map((route, index) => (
        <Tab key={route.key} tabBarProps={props} route={route} index={index} />
      ))}
    </View>
  )
}

const Tab = ({ route, tabBarProps, index }: { route: NavigationRoute<ParamListBase, string>, tabBarProps: BottomTabBarProps, index: number }) => {

  const styles = useStyles()
  const theme = useTheme()

  const { navigation, state, descriptors } = tabBarProps
  const { options } = descriptors[route.key]

  const label =
    options.tabBarLabel !== undefined
      ? options.tabBarLabel
      : options.title !== undefined
        ? options.title
        : route.name

  const isFocused = state.index === index
  const activeColor = options.tabBarActiveTintColor ?? "white"
  const inactiveColor = options.tabBarInactiveTintColor ?? "gray"
  const iconStyle = options.tabBarIconStyle
  const iconSize =
    iconStyle && typeof iconStyle === "object" && "width" in iconStyle
      ? Number(iconStyle.width)
      : 20

  const handlePress = () => {
    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    })

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name)
    }
  }



  return (
    <TouchableOpacity style={styles.tabContainer} onPress={handlePress}>
      {options.tabBarIcon?.({
        focused: isFocused,
        color: isFocused ? activeColor : inactiveColor,
        size: iconSize,
      })}
      <Text style={{ color: isFocused ? activeColor : inactiveColor }}>
        {label as string}
      </Text>
    </TouchableOpacity>
  )
}


const useStyles = () => {
  const theme = useTheme()

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          width: "90%",
          height: "9%",
          marginBottom: 20,
          marginLeft: "5%",
          backgroundColor: theme.colors.secondaryContainer,
          borderRadius: 20,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        },
        tabContainer: {
          height: "100%",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        },
      }),
    [theme],
  )
}