import { RegisterForm } from "@/features/register-with-email/ui/RegisterForm"
import { useScreenContainerStyles } from "@/shared/constants/styles"
import { StyleSheet, View } from "react-native"
import { Icon, useTheme } from "react-native-paper"


export const RegisterWithEmailScreen = () => {
  const theme = useTheme()

  const styles = useStyles()

  return (
    <View style={{ ...useScreenContainerStyles(), ...styles.container }}>
      <Icon source={"cash"} size={100} color={theme.colors.primary} />
      <RegisterForm />
    </View>
  )
}

const useStyles = () => {

  return (
    StyleSheet.create({
      container: {
        gap: 15
      },
      input: {
        width: '80%',
        flexGrow: 0,
        flexShrink: 0
      },

    })
  )
}