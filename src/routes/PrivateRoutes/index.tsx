import { Home } from '@/pages/Home'
import { createStackNavigator } from '@react-navigation/stack'

export type PrivateStackParamsList = {
  home: undefined
  transaction_details: undefined
}

export function PrivateRoutes() {
  const PrivateStackRoutes = createStackNavigator<PrivateStackParamsList>()
  return (
    <PrivateStackRoutes.Navigator screenOptions={{ headerShown: false }}>
      <PrivateStackRoutes.Screen name="home" component={Home} />
    </PrivateStackRoutes.Navigator>
  )
}
