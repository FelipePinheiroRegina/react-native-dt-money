import { useSnackbarContext } from '@/context/SnackbarContext'
import { AppError } from '../helpers/AppError'

export function useErrorHandler() {
  const { notify } = useSnackbarContext()

  function handleError(error: unknown, defaultMessage?: string) {
    const isAppError = error instanceof AppError

    const message = isAppError
      ? error.message
      : defaultMessage || 'An error occurred'

    notify({
      message: message,
      messageType: 'error',
    })
  }

  return { handleError }
}
