import { AppHeader } from '@/components/AppHeader'
import { useTransactionContext } from '@/context/TransactionContext'
import { TransactionTypes } from '@/shared/enums/transaction-types'
import { ScrollView, View } from 'react-native'
import { FilterInput } from './FilterInput'
import { TransactionCard } from './TransactionCard'

export function ListHeader() {
  const { transactions } = useTransactionContext()

  return (
    <>
      <AppHeader />
      <View className="h-[150] w-full">
        <View className="h-[50] bg-background-primary" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="absolute pl-6 h-[141]"
        >
          <TransactionCard
            type={TransactionTypes.EXPENSE}
            amount={transactions?.totalTransactions?.expense ?? 0}
          />
          <TransactionCard
            type={TransactionTypes.REVENUE}
            amount={transactions?.totalTransactions?.revenue ?? 0}
          />
          <TransactionCard
            type="total"
            amount={transactions?.totalTransactions?.total ?? 0}
          />
        </ScrollView>
      </View>
      <FilterInput />
    </>
  )
}
