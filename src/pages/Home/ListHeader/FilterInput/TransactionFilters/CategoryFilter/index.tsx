import { useTransactionContext } from '@/context/TransactionContext'
import Checkbox from 'expo-checkbox'
import { Text, TouchableOpacity, View } from 'react-native'

export function CategoryFilter() {
  const { categories, handleCategoryFilters, filters } = useTransactionContext()

  return (
    <View className="mb-6">
      <Text className="text-base font-medium mb-5 text-gray-600">
        Categories
      </Text>

      {categories.map((category) => (
        <TouchableOpacity
          onPress={() => handleCategoryFilters(category.id)}
          key={`category-${category.id}`}
          className="flex-row items-center py-2"
        >
          <Checkbox
            className="mr-4"
            value={Boolean(filters.categoryIds[category.id])}
            onValueChange={() => handleCategoryFilters(category.id)}
          />
          <Text className="text-lg text-white">{category.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}
