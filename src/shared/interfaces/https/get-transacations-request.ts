export interface GetTransactionsRequest {
  page: number
  perPage: number
  from?: Date
  to?: Date
  typeId?: number
  categoryIds?: number[]
  searchText?: string
}

export interface Filters {
  from?: Date
  to?: Date
  typeId?: number
  categoryIds: Record<number, boolean>
}
