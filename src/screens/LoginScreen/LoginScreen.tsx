import { useScreenContainerStyles } from "@/shared/constants/styles"
import { StyleSheet, View } from "react-native"
import { Button, Icon, Text, TextInput, useTheme } from "react-native-paper"
import { LogInWithEMailForm } from "@/features/login-with-email/ui/LogInWithEMailForm/LogInWithEMailForm"
import { LoginWithGoogleButton } from "@/features/login-with-google/ui/LoginWithGoogleButton/LoginWithGoogleButton"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { AuthStackParamList } from "@/app/navigator/AuthStackNavigator/types"


export const LoginScreen = () => {
  const theme = useTheme()
  const styles = useStyles()
  const containerStyle = useScreenContainerStyles()
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  return (
    <View style={{ ...containerStyle, ...styles.container }}>
      <Icon source={"cash"} size={100} color={theme.colors.primary} />
      <LogInWithEMailForm />
      <LoginWithGoogleButton />
      <Button mode="text" onPress={() => navigation.navigate("Register")}>
        Регистрация
      </Button>
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