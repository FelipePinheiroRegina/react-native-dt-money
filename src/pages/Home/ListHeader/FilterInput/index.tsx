import { useBottomSheetContext } from '@/context/BottomSheetContext'
import { useTransactionContext } from '@/context/TransactionContext'
import { colors } from '@/shared/colors'
import { MaterialIcons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { TransactionFilters } from './TransactionFilters'

export function FilterInput() {
  const { pagination, setSearch, search, fetchTransactions } =
    useTransactionContext()
  const { openBottomSheet } = useBottomSheetContext()

  const [text, setText] = useState('')

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(text)
    }, 500)

    return () => clearTimeout(handler)
  }, [text, setSearch])

  // biome-ignore lint:correctness/useExhaustiveDependencies
  useEffect(() => {
    ;(async () => {
      await fetchTransactions({ page: 1 })
    })()
  }, [search])

  return (
    <View className="mb-4 w-[90%] self-center">
      <View className="w-full flex-row justify-between items-center">
        <Text className="text-white text-xl font-bold">Transactions</Text>
        <Text className="text-gray-700 text-base">
          {pagination.totalRows} {pagination.totalRows === 1 ? 'Item' : 'Items'}
        </Text>
      </View>

      <TouchableOpacity className="flex-row items-center justify-between h-16">
        <TextInput
          value={text}
          onChangeText={setText}
          className="h-[50] text-white w-full bg-background-primary text-lg pl-4"
          placeholderTextColor={colors.gray['600']}
          placeholder="Search for a transaction"
        />
        <TouchableOpacity
          className="absolute right-0"
          onPress={() => openBottomSheet(<TransactionFilters />, 1)}
        >
          <MaterialIcons
            name="filter-list"
            size={26}
            color={colors['accent-brand-light']}
            className="mr-3"
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  )
}
