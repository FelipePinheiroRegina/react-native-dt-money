import { NavigationContainer } from '@react-navigation/native'
import { PublicRoutes } from './PublicRoutes'
import { useCallback, useState } from 'react'
import { PrivateRoutes } from './PrivateRoutes'
import { SystemBars } from 'react-native-edge-to-edge'
import { useAuthContext } from '@/context/AuthContext'
import { Loading } from '@/pages/Loading'

export default function Routes() {
  const [isLoading, setIsLoading] = useState(true)
  const { user, token } = useAuthContext()

  const RoutesComponent = useCallback(() => {
    if (isLoading) {
      return <Loading setLoading={setIsLoading} />
    }

    if (!user && !token) {
      return <PublicRoutes />
    } else {
      return <PrivateRoutes />
    }
  }, [user, token, isLoading])

  return (
    <NavigationContainer>
      <SystemBars style="light" />
      <RoutesComponent />
    </NavigationContainer>
  )
}
