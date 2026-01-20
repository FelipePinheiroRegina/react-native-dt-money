import { api } from '@/shared/api/dt-money'
import type { UpdateTransactionRequest } from '@/shared/interfaces/https/update-transaction-request'

export async function updateTransaction(transaction: UpdateTransactionRequest) {
  await api.put('/transaction', transaction)
}
