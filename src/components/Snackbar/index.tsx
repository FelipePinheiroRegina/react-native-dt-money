import { useSnackbarContext } from '@/context/SnackbarContext'
import { Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function Snackbar() {
  const { message, type } = useSnackbarContext()
  const inset = useSafeAreaInsets()

  if (!message || !type) return null

  const bgColor =
    type === 'success'
      ? 'bg-accent-brand-background-primary'
      : 'bg-accent-red-background-primary'

  return (
    <View
      className={`absolute self-center w-[90%] h-[50px] rounded-xl ${bgColor} justify-center z-10 p-2`}
      style={{ bottom: inset.bottom + 10 }}
    >
      <Text className="text-white text-base font-bold">{message}</Text>
    </View>
  )
}
