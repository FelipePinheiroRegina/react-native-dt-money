import { useAuthContext } from '@/context/AuthContext'
import { colors } from '@/shared/colors'
import { useEffect } from 'react'
import { ActivityIndicator, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface LoadingProps {
  setLoading: (loading: boolean) => void
}

export function Loading({ setLoading }: LoadingProps) {
  const { restoreUserSession, handleLogout } = useAuthContext()

  useEffect(() => {
    ;(async () => {
      try {
        const user = await restoreUserSession()
        if (!user) {
          await handleLogout()
        }
      } catch (error) {
        await handleLogout()
      } finally {
        setLoading(false)
      }
    })()
  }, [])
  return (
    <SafeAreaView className="bg-background-primary items-center justify-center flex-1">
      <>
        <Image
          source={require('@/assets/logo.png')}
          className="h-[48px] w-[255px]"
        />
        <ActivityIndicator color={colors.white} className="mt-20" />
      </>
    </SafeAreaView>
  )
}
