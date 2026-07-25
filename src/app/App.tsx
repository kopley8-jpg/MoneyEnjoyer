import React from "react"
import { StyleSheet, View } from "react-native"
import { PaperProvider, useTheme } from 'react-native-paper';

const App = () => {
  const styles = useStyles()

  return (

    <View style={styles.container} />
  )
}

const useStyles = () => {

  const theme = useTheme()

  return (
    StyleSheet.create({
      container: {
        width: "100%",
        height: "100%",
        backgroundColor: theme.colors.background
      }
    }))
}

export default App