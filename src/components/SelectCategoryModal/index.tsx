import { useTransactionContext } from '@/context/TransactionContext'
import clsx from 'clsx'
import { useState } from 'react'
import {
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { Checkbox } from 'expo-checkbox'

interface SelectCategoryModalProps {
  onSelect: (categoryId: number) => void
  selectedCategoryId: number | null
}

export function SelectCategoryModal({
  onSelect,
  selectedCategoryId,
}: SelectCategoryModalProps) {
  const [isVisible, setIsVisible] = useState(false)

  const { categories } = useTransactionContext()

  function handleToggleModal() {
    setIsVisible((state) => !state)
  }

  function handleSelectCategory(categoryId: number) {
    onSelect(categoryId)
    handleToggleModal()
  }

  const selectedCategoryName =
    categories.find((category) => category.id === selectedCategoryId)?.name ??
    'Select a category'

  return (
    <>
      <TouchableOpacity
        className="h-[50px] bg-background-primary my-2 rounded-[6] pl-4 justify-center"
        onPress={handleToggleModal}
      >
        <Text
          className={clsx(
            'text-lg',
            selectedCategoryId ? 'text-white' : 'text-gray-700'
          )}
        >
          {selectedCategoryName}
        </Text>
      </TouchableOpacity>

      <Modal visible={isVisible} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={handleToggleModal}>
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="w-[90%] bg-background-secondary p-4 rounded-xl">
              <Text className="text-white text-lg mb-4">Select a category</Text>
              <FlatList
                keyExtractor={(item) => `category-${item.id}`}
                data={categories}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    className="flex-row items-center bg-gray-800 rounded-lg mb-2 p-4"
                    onPress={() => handleSelectCategory(item.id)}
                  >
                    <Checkbox
                      value={selectedCategoryId === item.id}
                      onValueChange={() => handleSelectCategory(item.id)}
                      className="mr-2"
                    />
                    <Text className="text-white text-lg">{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  )
}
