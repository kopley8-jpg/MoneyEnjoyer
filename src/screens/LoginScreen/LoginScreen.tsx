import { useScreenContainerStyles } from '@/shared/constants/styles';
import { View } from 'react-native';
import { Button, Icon, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/app/navigator/AuthStackNavigator/types';
import { useStyles } from './styles';
import { LogInWithEmailForm, LoginWithGoogleButton } from '@/features/auth';

export const LoginScreen = () => {
  const theme = useTheme();
  const styles = useStyles();
  const containerStyle = useScreenContainerStyles();
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  return (
    <View style={{ ...containerStyle, ...styles.container }}>
      <Icon source={'cash'} size={100} color={theme.colors.primary} />
      <LogInWithEmailForm />
      <LoginWithGoogleButton />
      <Button mode="text" onPress={() => navigation.navigate('Register')}>
        Регистрация
      </Button>
    </View>
  );
};
