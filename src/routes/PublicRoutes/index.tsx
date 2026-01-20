import { Register } from '@/pages/Register'
import { createStackNavigator } from '@react-navigation/stack'
import { Login } from '@/pages/Login'

export type PublicStackParamsList = {
  login: undefined
  register: undefined
}

export function PublicRoutes() {
  const PublicStackRoutes = createStackNavigator<PublicStackParamsList>()
  return (
    <PublicStackRoutes.Navigator screenOptions={{ headerShown: false }}>
      <PublicStackRoutes.Screen name="login" component={Login} />
      <PublicStackRoutes.Screen name="register" component={Register} />
    </PublicStackRoutes.Navigator>
  )
}
