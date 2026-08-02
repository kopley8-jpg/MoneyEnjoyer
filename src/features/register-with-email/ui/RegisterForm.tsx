import { StyleSheet, View } from "react-native"
import { Button, Text, TextInput, useTheme } from "react-native-paper"
import { useRegisterForm } from "./model/useRegisterForm"
import { typedEntries } from "@/shared/lib/typedEntries"
import { FormType } from "./model/types"


export const RegisterForm = () => {

  const styles = useStyles()
  const { form, error, handler } = useRegisterForm()


  return (
    <View style={styles.container}>
      {typedEntries(form).map(([key, value]) => (
        <TextInput
          key={key}
          label={translate[key]}
          value={value}
          error={error ? error.entries.includes(key) : false}
          {...handler.handleTextInputChange(key)} />
      ))}
      {error && (
        <Text style={styles.message}>
          {error.message}
        </Text>
      )}
      <Button mode="contained" {...handler.button}>
        Зарегистрироваться
      </Button>
    </View>
  )
}

const translate: Record<keyof FormType, string> = {
  displayName: "Имя",
  email: "e-mail",
  password: "Пароль",
  repeatPassword: "Подтвердите пароль"
}

const useStyles = () => {

  const theme = useTheme()

  return (
    StyleSheet.create({
      container: {
        width: "80%",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
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