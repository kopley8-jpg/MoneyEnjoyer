import { useScreenContainerStyles } from "@/shared/constants/styles"
import { StyleSheet, View } from "react-native"

export const EarnsScreen = () => {

  const styles = { ...useStyles(), container: useScreenContainerStyles() }

  return (
    <View style={styles.container} />
  )
}

const useStyles = () => {

  return (
    StyleSheet.create({

    })
  )
}