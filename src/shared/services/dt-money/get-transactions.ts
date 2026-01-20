import { api } from '@/shared/api/dt-money'
import type { GetTransactionsRequest } from '@/shared/interfaces/https/get-transacations-request'
import type { GetTransactionsResponse } from '@/shared/interfaces/https/get-transactions-response'
import qs from 'qs'

export async function getTransactions(params: GetTransactionsRequest) {
  const response = await api.get<GetTransactionsResponse>('/transaction', {
    params,
    paramsSerializer: (p) => qs.stringify(p, { arrayFormat: 'repeat' }),
  })
  return response.data
}
