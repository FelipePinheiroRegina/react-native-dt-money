import { Button } from '@/components/Button'
import { useBottomSheetContext } from '@/context/BottomSheetContext'
import { useTransactionContext } from '@/context/TransactionContext'
import { colors } from '@/shared/colors'
import { useErrorHandler } from '@/shared/hooks/useErrorHandler'
import { MaterialIcons } from '@expo/vector-icons'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { CategoryFilter } from './CategoryFilter'
import { DateFilter } from './DateFilter'
import { TypeFilter } from './TypeFilter'

export function TransactionFilters() {
  const { closeBottomSheet } = useBottomSheetContext()
  const { fetchTransactions, isRefreshing, resetFilters } =
    useTransactionContext()
  const { handleError } = useErrorHandler()
  const inset = useSafeAreaInsets()

  async function handleApplyFilters() {
    try {
      await fetchTransactions({ page: 1 })
      closeBottomSheet()
    } catch (error) {
      handleError(error, 'Failed to apply filters')
    }
  }

  async function handleResetFilters() {
    try {
      await resetFilters()
      closeBottomSheet()
    } catch (error) {
      handleError(error, 'Failed to reset filters')
    }
  }

  return (
    <View
      className="flex-1 bg-gray[1000] p-6"
      style={{ paddingBottom: inset.bottom }}
    >
      <View className="flex-row justify-between">
        <Text className="text-xl font-bold mb-5 text-white">
          Filter transactions
        </Text>
        <TouchableOpacity onPress={closeBottomSheet}>
          <MaterialIcons name="close" size={20} color={colors.gray[600]} />
        </TouchableOpacity>
      </View>

      <DateFilter />

      <CategoryFilter />

      <TypeFilter />

      <View className="flex-row gap-4 mt-8">
        <Button
          className="flex-1"
          variant="outline"
          widthFull={false}
          onPress={handleResetFilters}
          disabled={isRefreshing}
        >
          Clear filters
        </Button>
        <Button
          className="flex-1"
          widthFull={false}
          onPress={handleApplyFilters}
          disabled={isRefreshing}
        >
          {isRefreshing ? (
            <ActivityIndicator size="small" color={colors.white} />
          ) : (
            'Apply filters'
          )}
        </Button>
      </View>
    </View>
  )
}
