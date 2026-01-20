import axios from 'axios'
import { Platform } from 'react-native'
import { AppError } from '../helpers/AppError'
import { addTokenToHeader } from '../helpers/axios.helper'

const baseUrl = Platform.select({
  ios: 'http://localhost:3001',
  android: 'http://10.0.2.2:3001',
})

export const api = axios.create({
  baseURL: baseUrl,
})

addTokenToHeader(api)

api.interceptors.response.use(
  (config) => config,
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message))
    } else {
      return Promise.reject(new AppError('Erro ao processar a requisição'))
    }
  }
)
