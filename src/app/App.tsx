import React from "react"
import { StyleSheet, View } from "react-native"
import { PaperProvider, useTheme } from 'react-native-paper';
import { useStyles } from "./styles";
import { NavigationContainer } from "@react-navigation/native";
import { Tabs } from "./Tabs";

const App = () => {

  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // 👈 ОБЯЗАТЕЛЬНО! Без этого View не растягивается
    backgroundColor: '#fff',
  },
})

export default App