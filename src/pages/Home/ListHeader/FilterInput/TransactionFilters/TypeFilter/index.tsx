import { useTransactionContext } from '@/context/TransactionContext'
import { TransactionTypes } from '@/shared/enums/transaction-types'
import Checkbox from 'expo-checkbox'
import { Text, TouchableOpacity, View } from 'react-native'

export function TypeFilter() {
  const { filters, handleFilters } = useTransactionContext()

  function handleSelectType(typeId: TransactionTypes) {
    handleFilters({ key: 'typeId', value: typeId })
  }
  return (
    <View className="mb-6">
      <Text className="text-base font-medium mb-5 text-gray-600">
        Transaction type
      </Text>

      <TouchableOpacity
        onPress={() => handleSelectType(TransactionTypes.REVENUE)}
        className="flex-row items-center py-2"
      >
        <Checkbox
          className="mr-4"
          value={filters.typeId === TransactionTypes.REVENUE}
          onValueChange={() => handleSelectType(TransactionTypes.REVENUE)}
        />
        <Text className="text-lg text-white">Revenue</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleSelectType(TransactionTypes.EXPENSE)}
        className="flex-row items-center py-2"
      >
        <Checkbox
          className="mr-4"
          value={filters.typeId === TransactionTypes.EXPENSE}
          onValueChange={() => handleSelectType(TransactionTypes.EXPENSE)}
        />
        <Text className="text-lg text-white">Expense</Text>
      </TouchableOpacity>
    </View>
  )
}
