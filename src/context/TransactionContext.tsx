import type { CreateTransactionRequest } from '@/shared/interfaces/https/create-transaction-request'
import type { Filters } from '@/shared/interfaces/https/get-transacations-request'
import type { GetTransactionsResponse } from '@/shared/interfaces/https/get-transactions-response'
import type { Pagination } from '@/shared/interfaces/https/pagination'
import type { TransactionCategory } from '@/shared/interfaces/https/transacation-categories'
import type { UpdateTransactionRequest } from '@/shared/interfaces/https/update-transaction-request'
import { createTransaction as createTransactionService } from '@/shared/services/dt-money/create-transaction'
import { getCategories } from '@/shared/services/dt-money/get-categories'
import { getTransactions } from '@/shared/services/dt-money/get-transactions'
import { updateTransaction as updateTransactionService } from '@/shared/services/dt-money/update-transaction'
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  useTransition,
} from 'react'

interface FetchTransactionsParams {
  page: number
}

interface HandleFiltersParams {
  key: keyof Filters
  value: Date | boolean | number
}

export type TransactionType = {
  fetchCategories: () => Promise<void>
  categories: TransactionCategory[]
  createTransaction: (transaction: CreateTransactionRequest) => Promise<void>
  updateTransaction: (transaction: UpdateTransactionRequest) => Promise<void>
  fetchTransactions: (params: FetchTransactionsParams) => Promise<void>
  transactions: GetTransactionsResponse
  refreshTransactions: () => Promise<void>
  isRefreshing: boolean
  loadMoreTransactions: () => Promise<void>
  pagination: Pagination
  setSearch: (search: string) => void
  search: string
  filters: Filters
  handleFilters: (params: HandleFiltersParams) => void
  handleCategoryFilters: (categoryId: number) => void
  resetFilters: () => Promise<void>
}

const TransactionContext = createContext({} as TransactionType)

const filtersInitialState: Filters = {
  from: undefined,
  to: undefined,
  typeId: undefined,
  categoryIds: {},
}

export function TransactionProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [categories, setCategories] = useState<TransactionCategory[]>([])
  const [transactions, setTransactions] = useState<GetTransactionsResponse>(
    {} as GetTransactionsResponse
  )
  const [search, setSearch] = useState('')
  const [isRefreshing, startTransition] = useTransition()
  const preventsUnnecessaryInitialSearch = useRef(true)
  const [filters, setFilters] = useState<Filters>(filtersInitialState)

  const categoryIds = useMemo(() => {
    return Object.entries(filters.categoryIds)
      .filter(([_, value]) => value)
      .map(([key]) => Number(key))
  }, [filters.categoryIds])

  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    perPage: 5,
    totalRows: 0,
    totalPages: 0,
  })

  async function fetchCategories() {
    const response = await getCategories()
    setCategories(response)
  }

  async function createTransaction(transaction: CreateTransactionRequest) {
    startTransition(async () => {
      await createTransactionService(transaction)
      await refreshTransactions()
    })
  }

  async function updateTransaction(transaction: UpdateTransactionRequest) {
    startTransition(async () => {
      await updateTransactionService(transaction)
      await refreshTransactions()
    })
  }

  const fetchTransactions = useCallback(
    async ({ page = 1 }: FetchTransactionsParams) => {
      startTransition(async () => {
        const response = await getTransactions({
          page,
          perPage: pagination.perPage,
          searchText: search,
          ...filters,
          categoryIds,
        })

        if (page === 1) {
          preventsUnnecessaryInitialSearch.current = false
          setTransactions(response)
        } else {
          setTransactions((state) => {
            return {
              ...response,
              data: [...state.data, ...response.data],
            }
          })
        }

        setPagination({
          ...pagination,
          page,
          totalRows: response.totalRows,
          totalPages: response.totalPages,
        })
      })
    },
    [pagination, search, categoryIds, filters]
  )

  const refreshTransactions = useCallback(async () => {
    const { page, perPage } = pagination
    const response = await getTransactions({
      page: 1,
      perPage: page * perPage,
      searchText: search,
      ...filters,
      categoryIds,
    })
    setTransactions(response)
    setPagination({
      ...pagination,
      page,
      totalRows: response.totalRows,
      totalPages: response.totalPages,
    })
  }, [pagination, categoryIds, filters, search])

  const loadMoreTransactions = useCallback(async () => {
    if (
      isRefreshing ||
      preventsUnnecessaryInitialSearch.current ||
      pagination.page >= pagination.totalPages
    )
      return

    fetchTransactions({ page: pagination.page + 1 })
  }, [isRefreshing, pagination, fetchTransactions])

  function handleFilters(params: HandleFiltersParams) {
    setFilters((state) => {
      return {
        ...state,
        [params.key]: params.value,
      }
    })
  }

  function handleCategoryFilters(categoryId: number) {
    setFilters((state) => {
      return {
        ...state,
        categoryIds: {
          ...state.categoryIds,
          [categoryId]: !state.categoryIds[categoryId],
        },
      }
    })
  }

  const resetFilters = useCallback(async () => {
    setFilters(filtersInitialState)
    setSearch('')

    const response = await getTransactions({
      page: 1,
      perPage: pagination.perPage,
      searchText: '',
      categoryIds: [],
    })
    setTransactions(response)
    setPagination({
      ...pagination,
      page: 1,
      totalRows: response.totalRows,
      totalPages: response.totalPages,
    })
  }, [pagination])

  return (
    <TransactionContext.Provider
      value={{
        categories,
        fetchCategories,
        createTransaction,
        fetchTransactions,
        transactions,
        updateTransaction,
        refreshTransactions,
        isRefreshing,
        loadMoreTransactions,
        pagination,
        setSearch,
        search,
        filters,
        handleFilters,
        handleCategoryFilters,
        resetFilters,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}

export function useTransactionContext() {
  return useContext(TransactionContext)
}
