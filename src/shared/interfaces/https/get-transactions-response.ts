export interface GetTransactionsResponse {
  data: Transaction[]
  totalRows: number
  totalPages: number
  page: number
  perPage: number
  totalTransactions: TotalTransactions
}

export interface Transaction {
  id: number
  value: number
  description: string
  categoryId: number
  typeId: number
  type: TransactionType
  category: TransactionCategory
  createdAt: string
  updatedAt: string
  deletedAt: string
}

export interface TransactionType {
  id: number
  name: string
}

export interface TransactionCategory {
  id: number
  name: string
}

export interface TotalTransactions {
  revenue: number
  expense: number
  total: number
}
