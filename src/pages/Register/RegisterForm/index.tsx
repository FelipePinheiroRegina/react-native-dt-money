import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import type { PublicStackParamsList } from '@/routes/PublicRoutes'
import { type NavigationProp, useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'
import { Text, View } from 'react-native'
import { registerFormSchema, type RegisterFormSchema } from './schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuthContext } from '@/context/AuthContext'
import { useErrorHandler } from '@/shared/hooks/useErrorHandler'

export function RegisterForm() {
  const { handleRegister } = useAuthContext()
  const { handleError } = useErrorHandler()
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterFormSchema>({
    resolver: yupResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const navigation = useNavigation<NavigationProp<PublicStackParamsList>>()

  async function onSubmit(data: RegisterFormSchema) {
    try {
      await handleRegister(data)
    } catch (error) {
      handleError(error, 'An error occurred while registering')
    }
  }

  return (
    <View>
      <Input<RegisterFormSchema>
        control={control}
        name="name"
        label="NAME"
        placeholder="John Doe"
        leftIconName="person-outline"
      />
      <Input<RegisterFormSchema>
        control={control}
        name="email"
        label="EMAIL"
        placeholder="john.doe@example.com"
        leftIconName="mail-outline"
      />
      <Input<RegisterFormSchema>
        control={control}
        name="password"
        label="PASSWORD"
        placeholder="********"
        leftIconName="lock-outline"
        secureTextEntry
      />
      <Input<RegisterFormSchema>
        control={control}
        name="confirmPassword"
        label="CONFIRM PASSWORD"
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
          Register
        </Button>

        <View>
          <Text className="mb-6 text-gray-300 text-base">
            Already have an account?
          </Text>
          <Button
            variant="outline"
            iconName="arrow-forward"
            onPress={() => navigation.navigate('login')}
          >
            Login
          </Button>
        </View>
      </View>
    </View>
  )
}
