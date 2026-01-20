import { useKeyboardVisible } from '@/shared/hooks/userKeyboardVisible'
import { Image, View } from 'react-native'

export function AuthHeader() {
  const isKeyboardVisible = useKeyboardVisible()

  if (isKeyboardVisible) {
    return null
  }

  return (
    <View className="items-center justify-center w-full min-h-40">
      <Image
        source={require('@/assets/logo.png')}
        className="h-[48px] w-[255px]"
      />
    </View>
  )
}
