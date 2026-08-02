import { StyleSheet, View } from "react-native"
import { Button, Text, TextInput, useTheme } from "react-native-paper"

import { useLogInWithEMailForm } from "./model/useLogInWithEMailForm"

export const LogInWithEMailForm = () => {

  const styles = useStyles()
  const { handler, form, error } = useLogInWithEMailForm()


  return (
    <View style={styles.container}>
      <TextInput label={"e-mail"} value={form.email} style={styles.input} {...handler.input("email")} error={error?.entries.includes("email")} />
      <TextInput label={"Пароль"} value={form.password} style={styles.input} {...handler.input("password")} error={error?.entries.includes("password")} />
      {error && <Text style={styles.message}>{error?.msg}</Text>}
      <Button mode="contained" {...handler.button}>
        Войти
      </Button>
    </View>
  )
}

const useStyles = () => {
  const theme = useTheme()
  return (
    StyleSheet.create({
      container: {
        width: "80%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 15
      },
      input: {
        width: '100%',
        flexGrow: 0,
        flexShrink: 0
      },
      message: {
        color: theme.colors.error,
        textAlign: "center"
      }
    })
  )
}