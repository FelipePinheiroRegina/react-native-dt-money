import { api } from '@/shared/api/dt-money'

export async function deleteTransaction(transactionId: number) {
  await api.delete(`/transaction/${transactionId}`)
}
