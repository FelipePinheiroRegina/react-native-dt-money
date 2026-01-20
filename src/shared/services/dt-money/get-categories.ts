import { api } from '@/shared/api/dt-money'
import type { TransactionCategory } from '@/shared/interfaces/https/transacation-categories'

export async function getCategories() {
  const response = await api.get<TransactionCategory[]>(
    '/transaction/categories'
  )
  return response.data
}
