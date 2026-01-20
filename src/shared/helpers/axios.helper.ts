import { STORAGE_KEY } from '@/context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import type { AxiosInstance } from 'axios'
import type { AuthenticateResponse } from '../interfaces/https/auth-response'

export const addTokenToHeader = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(async (config) => {
    const userData = await AsyncStorage.getItem(STORAGE_KEY)

    if (userData) {
      const { token } = JSON.parse(userData) as AuthenticateResponse

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }

    return config
  })
}
