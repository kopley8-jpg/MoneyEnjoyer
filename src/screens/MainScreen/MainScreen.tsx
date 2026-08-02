import { useScreenContainerStyles } from "@/shared/constants/styles"
import { getAuth, signOut } from "@react-native-firebase/auth"
import { StyleSheet, View } from "react-native"

export const MainScreen = () => {

  const styles = { ...useStyles(), container: useScreenContainerStyles() }

  return (
    <View style={styles.container} onTouchEnd={async () => {
      console.log("aboba")
      await logout()
    }}>

    </View>
  )
}

const useStyles = () => {

  return (
    StyleSheet.create({

    })
  )
}


export const logout = async () => {
  try {
    await signOut(getAuth())
  } catch (error) {
    console.error('Logout failed:', error)
    throw error
  }
}