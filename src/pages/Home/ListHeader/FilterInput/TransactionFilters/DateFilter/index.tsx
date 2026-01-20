import { useTransactionContext } from '@/context/TransactionContext'
import clsx from 'clsx'
import { format } from 'date-fns'
import { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'

export function DateFilter() {
  const [showStartDatePicker, setShowStartDatePicker] = useState(false)
  const [showEndDatePicker, setShowEndDatePicker] = useState(false)
  const { filters, handleFilters } = useTransactionContext()

  const onStartDateCancel = () => setShowStartDatePicker(false)
  function onStartDateConfirm(date: Date) {
    setShowStartDatePicker(false)
    handleFilters({ key: 'from', value: date })
  }

  const onEndDateCancel = () => setShowEndDatePicker(false)
  function onEndDateConfirm(date: Date) {
    setShowEndDatePicker(false)
    handleFilters({ key: 'to', value: date })
  }

  function formatDate(date?: Date) {
    if (!date) return undefined
    return format(date, 'dd/MM/yyyy')
  }

  return (
    <>
      <Text className="text-base font-medium mb-5 text-gray-600">Date</Text>

      <View className="flex-row justify-between mb-6">
        <View className="w-[48%]">
          <TouchableOpacity
            className="rounded-md p-2 border-b border-gray-800"
            onPress={() => setShowStartDatePicker(true)}
          >
            <Text
              className={clsx(
                'text-lg',
                filters.from ? 'text-white' : 'text-gray-700'
              )}
            >
              {formatDate(filters.from) ?? 'From'}
            </Text>
          </TouchableOpacity>
        </View>

        <View className="w-[48%]">
          <TouchableOpacity
            className="rounded-md p-2 border-b border-gray-800"
            onPress={() => setShowEndDatePicker(true)}
          >
            <Text
              className={clsx(
                'text-lg',
                filters.to ? 'text-white' : 'text-gray-700'
              )}
            >
              {formatDate(filters.to) ?? 'To'}
            </Text>
          </TouchableOpacity>
        </View>

        <DateTimePicker
          isVisible={showStartDatePicker}
          date={filters.from}
          onConfirm={onStartDateConfirm}
          onCancel={onStartDateCancel}
          mode="date"
          confirmTextIOS="Confirm"
          cancelTextIOS="Cancel"
        />

        <DateTimePicker
          isVisible={showEndDatePicker}
          date={filters.to}
          onConfirm={onEndDateConfirm}
          onCancel={onEndDateCancel}
          mode="date"
          confirmTextIOS="Confirm"
          cancelTextIOS="Cancel"
        />
      </View>
    </>
  )
}
