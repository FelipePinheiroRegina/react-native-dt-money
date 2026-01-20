import { useBottomSheetContext } from '@/context/BottomSheetContext'
import { colors } from '@/shared/colors'
import type { Transaction } from '@/shared/interfaces/https/get-transactions-response'
import { MaterialIcons } from '@expo/vector-icons'
import { Pressable, View } from 'react-native'
import { EditTransactionForm } from './EditTransactionForm'

interface LeftActionProps {
  transaction: Transaction
}

export function LeftAction({ transaction }: LeftActionProps) {
  const { openBottomSheet } = useBottomSheetContext()

  return (
    <Pressable
      onPress={() =>
        openBottomSheet(
          <EditTransactionForm initialTransaction={transaction} />,
          0
        )
      }
    >
      <View className="h-[140] bg-accent-blue-background-primary w-[80] rounded-l-[6] items-center justify-center">
        <MaterialIcons name="edit" size={30} color={colors.white} />
      </View>
    </Pressable>
  )
}
