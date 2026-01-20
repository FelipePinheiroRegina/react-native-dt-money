import { colors } from '@/shared/colors'
import { TransactionTypes } from '@/shared/enums/transaction-types'
import type { Transaction } from '@/shared/interfaces/https/get-transactions-response'
import { Format } from '@/shared/utils/format'
import { MaterialIcons } from '@expo/vector-icons'
import clsx from 'clsx'
import { format } from 'date-fns'
import { Text, View } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { LeftAction } from './LeftAction'
import { RightAction } from './RightAction'

interface TransactionCardProps {
  transaction: Transaction
}

export function TransactionCard({ transaction }: TransactionCardProps) {
  const isExpense = transaction.typeId === TransactionTypes.EXPENSE
  return (
    <Swipeable
      renderRightActions={() => <RightAction transactionId={transaction.id} />}
      renderLeftActions={() => <LeftAction transaction={transaction} />}
      overshootRight={false}
      overshootLeft={false}
    >
      <View className="align-items-center self-center overflow-visible w-[90%] mb-4">
        <View className="h-[140] bg-background-tertiary rounded-md p-6">
          <Text className="text-white text-base">
            {transaction.description}
          </Text>
          <Text
            className={clsx(
              'text-xl font-bold mt-2',
              isExpense ? 'text-accent-red' : 'text-accent-brand-light'
            )}
          >
            {isExpense && '-'} {Format.currency(transaction.value)}
          </Text>
          <View className="flex-row w-full justify-between items-center">
            <View className="items-center flex-row mt-3">
              <MaterialIcons
                name="label-outline"
                color={colors.gray['700']}
                size={23}
              />
              <Text className="text-gray-700 text-base ml-2">
                {transaction.category?.name}
              </Text>
            </View>

            <View className="items-center flex-row mt-3">
              <MaterialIcons
                name="calendar-month"
                color={colors.gray['700']}
                size={20}
              />
              <Text className="text-gray-700 text-base ml-2">
                {format(transaction.createdAt, 'dd/MM/yyyy')}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Swipeable>
  )
}
