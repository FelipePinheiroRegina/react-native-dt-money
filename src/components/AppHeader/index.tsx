import { Image, Text, TouchableOpacity, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { colors } from '@/shared/colors'
import { useAuthContext } from '@/context/AuthContext'
import { useBottomSheetContext } from '@/context/BottomSheetContext'
import { NewTransaction } from '../NewTransaction'

export function AppHeader() {
  const { handleLogout } = useAuthContext()
  const { openBottomSheet } = useBottomSheetContext()
  return (
    <View className="w-full flex-row p-8 justify-between bg-background-primary">
      <View>
        <Image
          source={require('@/assets/logo.png')}
          className="w-[130px] h-[30px]"
        />

        <TouchableOpacity
          onPress={handleLogout}
          className="flex-row items-center gap-2 mt-2"
        >
          <MaterialIcons name="logout" color={colors.gray['700']} size={15} />
          <Text className="text-gray-700 text-base">Logout</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => openBottomSheet(<NewTransaction />, 0)}
        className="bg-accent-brand w-[130px] items-center justify-center rounded-xl h-[50px]"
      >
        <Text className="text-white font-bold text-sm">New transaction</Text>
      </TouchableOpacity>
    </View>
  )
}
