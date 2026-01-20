import { useTransactionContext } from '@/context/TransactionContext'
import { colors } from '@/shared/colors'
import { TransactionTypes } from '@/shared/enums/transaction-types'
import { Format } from '@/shared/utils/format'
import { MaterialIcons } from '@expo/vector-icons'
import clsx from 'clsx'
import { format } from 'date-fns'
import { Text, View } from 'react-native'

export type TransactionCardType = TransactionTypes | 'total'

interface TransactionCardProps {
  type: TransactionCardType
  amount: number
}

interface IconsData {
  name: keyof typeof MaterialIcons.glyphMap
  color: string
}

const ICONS: Record<TransactionCardType, IconsData> = {
  [TransactionTypes.REVENUE]: {
    name: 'arrow-circle-up',
    color: colors['accent-brand-light'],
  },
  [TransactionTypes.EXPENSE]: {
    name: 'arrow-circle-down',
    color: colors['accent-red'],
  },
  total: {
    name: 'attach-money',
    color: colors.white,
  },
}

interface CardData {
  label: string
  bgColor: string
}

const CARDS_DATA: Record<TransactionCardType, CardData> = {
  [TransactionTypes.REVENUE]: {
    label: 'Revenue',
    bgColor: colors['background-tertiary'],
  },
  [TransactionTypes.EXPENSE]: {
    label: 'Expense',
    bgColor: colors['background-tertiary'],
  },
  total: {
    label: 'Total',
    bgColor: colors['accent-brand-background-primary'],
  },
}

export function TransactionCard({ type, amount }: TransactionCardProps) {
  const cardData = CARDS_DATA[type]
  const iconsData = ICONS[type]

  const { transactions, filters } = useTransactionContext()

  const lastTransaction = transactions?.data?.find(
    (transaction) => transaction.typeId === type
  )

  function renderDateInfo() {
    if (type === 'total') {
      return (
        <Text className="text-white text-base">
          {filters.from && filters.to
            ? `${format(filters.from, 'd MMMM')} to ${format(filters.to, 'd MMMM')}`
            : 'The entire period'}
        </Text>
      )
    } else {
      return (
        <Text className="text-gray-700">
          {lastTransaction?.createdAt &&
            format(
              lastTransaction?.createdAt,
              `'Last ${cardData.label.toLowerCase()} em' d 'de' MMMM`
            )}

          {!lastTransaction?.createdAt && 'No transactions yet'}
        </Text>
      )
    }
  }

  return (
    <View
      style={{ backgroundColor: cardData.bgColor }}
      className={clsx(
        'min-w-[224] rounded-md px-8 py-6 justify-between mr-6',
        type === 'total' && 'mr-12'
      )}
    >
      <View className="flex-row justify-between items-center mb-1">
        <Text className="text-white text-base">{cardData.label}</Text>
        <MaterialIcons
          name={iconsData.name}
          size={26}
          color={iconsData.color}
        />
      </View>

      <View>
        <Text className="text-2xl text-gray-400 text-bold">
          {Format.currency(amount)}
        </Text>

        {renderDateInfo()}
      </View>
    </View>
  )
}
