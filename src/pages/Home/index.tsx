import { useTransactionContext } from '@/context/TransactionContext'
import { useErrorHandler } from '@/shared/hooks/useErrorHandler'
import { useEffect } from 'react'
import { FlatList, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { EmptyList } from './EmptyList'
import { ListHeader } from './ListHeader'
import { TransactionCard } from './TransactionCard'

export function Home() {
  const {
    fetchCategories,
    fetchTransactions,
    transactions,
    refreshTransactions,
    isRefreshing,
    loadMoreTransactions,
  } = useTransactionContext()
  const { handleError } = useErrorHandler()

  async function handleFetchCategories() {
    try {
      await fetchCategories()
    } catch (error) {
      handleError(error, 'Error fetching categories')
    }
  }

  async function handleFetchInitialTransactions() {
    try {
      await fetchTransactions({ page: 1 })
    } catch (error) {
      handleError(error, 'Error fetching initial transactions')
    }
  }

  async function handleLoadMoreTransactions() {
    try {
      await loadMoreTransactions()
    } catch (error) {
      handleError(error, 'Error loading more transactions')
    }
  }

  async function handleRefreshTransactions() {
    try {
      await refreshTransactions()
    } catch (error) {
      handleError(error, 'Error refreshing transactions')
    }
  }

  // biome-ignore lint:correctness/useExhaustiveDependencies
  useEffect(() => {
    ;(async () => {
      await Promise.all([
        handleFetchCategories(),
        handleFetchInitialTransactions(),
      ])
    })()
  }, [])

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <FlatList
        className="bg-background-secondary"
        keyExtractor={(item) => `transaction-${item.id}`}
        data={transactions?.data ?? []}
        ListHeaderComponent={<ListHeader />}
        renderItem={({ item }) => <TransactionCard transaction={item} />}
        ListEmptyComponent={EmptyList}
        onEndReached={handleLoadMoreTransactions}
        refreshControl={
          <RefreshControl
            onRefresh={handleRefreshTransactions}
            refreshing={isRefreshing}
          />
        }
      />
    </SafeAreaView>
  )
}
