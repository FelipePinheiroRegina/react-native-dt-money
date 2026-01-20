import { api } from '@/shared/api/dt-money'
import type { CreateTransactionRequest } from '@/shared/interfaces/https/create-transaction-request'

export async function createTransaction(transaction: CreateTransactionRequest) {
  await api.post('/transaction', transaction)
}
