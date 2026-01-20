import { AuthProvider } from './context/AuthContext'
import '@/styles/global.css'
import Routes from '@/routes'
import { SnackbarProvider } from './context/SnackbarContext'
import { Snackbar } from './components/Snackbar'
import { BottomSheetProvider } from './context/BottomSheetContext'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { TransactionProvider } from './context/TransactionContext'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function App() {
  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaProvider>
        <SnackbarProvider>
          <AuthProvider>
            <TransactionProvider>
              <BottomSheetProvider>
                <Routes />
                <Snackbar />
              </BottomSheetProvider>
            </TransactionProvider>
          </AuthProvider>
        </SnackbarProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
