import { StyleSheet, View } from "react-native"

export const SpendingsScreen = () => {

  const styles = useStyles()

  return (
    <View style={styles.container} />
  )
}

const useStyles = () => {

  return (
    StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "red"
      }
    })
  )
}