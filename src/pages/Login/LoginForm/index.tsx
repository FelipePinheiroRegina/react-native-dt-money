import { Alert, Text, View } from 'react-native'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { type NavigationProp, useNavigation } from '@react-navigation/native'
import type { PublicStackParamsList } from '@/routes/PublicRoutes'
import { loginFormSchema, type LoginFormSchema } from './schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuthContext } from '@/context/AuthContext'
import { AxiosError } from 'axios'
import { useSnackbarContext } from '@/context/SnackbarContext'
import { AppError } from '@/shared/helpers/AppError'
import { useErrorHandler } from '@/shared/hooks/useErrorHandler'

export function LoginForm() {
  const { handleAuthenticate } = useAuthContext()
  const { notify } = useSnackbarContext()
  const { handleError } = useErrorHandler()

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormSchema>({
    resolver: yupResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(data: LoginFormSchema) {
    try {
      await handleAuthenticate(data)
    } catch (error) {
      handleError(error, 'An error occurred while logging in')
    }
  }

  const navigation = useNavigation<NavigationProp<PublicStackParamsList>>()
  return (
    <View>
      <Input
        control={control}
        name="email"
        label="EMAIL"
        placeholder="mail.example.com"
        leftIconName="mail-outline"
      />

      <Input
        control={control}
        name="password"
        label="PASSWORD"
        placeholder="********"
        leftIconName="lock-outline"
        secureTextEntry
      />

      <View className="flex-1 justify-between mt-8 mb-6 min-h-[250px]">
        <Button
          iconName="arrow-forward"
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          Login
        </Button>

        <View>
          <Text className="mb-6 text-gray-300 text-base">
            Don't have an account?
          </Text>
          <Button
            variant="outline"
            iconName="arrow-forward"
            onPress={() => navigation.navigate('register')}
          >
            Register
          </Button>
        </View>
      </View>
    </View>
  )
}
