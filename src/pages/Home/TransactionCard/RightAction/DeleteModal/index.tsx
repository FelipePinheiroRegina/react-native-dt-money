import { useSnackbarContext } from '@/context/SnackbarContext'
import { colors } from '@/shared/colors'
import { useErrorHandler } from '@/shared/hooks/useErrorHandler'
import { deleteTransaction } from '@/shared/services/dt-money/delete-transaction'
import { MaterialIcons } from '@expo/vector-icons'
import {
  ActivityIndicator,
  Modal,
  type ModalProps,
  type NativeSyntheticEvent,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { useTransition } from 'react'

export function DeleteModal(props: ModalProps & { transactionId: number }) {
  const { handleError } = useErrorHandler()
  const { notify } = useSnackbarContext()
  const [isPending, startTransition] = useTransition()

  function handleDeleteTransaction(e: NativeSyntheticEvent<any>) {
    startTransition(async () => {
      try {
        await deleteTransaction(props.transactionId)
        notify({
          message: 'Transaction deleted successfully',
          messageType: 'success',
        })
      } catch (error) {
        handleError(error, 'Failed to delete transaction')
      } finally {
        props.onRequestClose?.(e)
      }
    })
  }

  return (
    <View className="flex-1 absolute">
      <Modal {...props} animationType="slide" transparent>
        <TouchableWithoutFeedback onPress={props.onRequestClose}>
          <View className="flex-1 items-center justify-center bg-black/50">
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <View className="m-5 bg-background-secondary rounded-[16] p-8 items-center shadow-lg w-[90%] h-[322] z-9">
                <View className="w-full flex-row items-center justify-between border-b border-gray-300 pb-6">
                  <View className="flex-row gap-6 items-center">
                    <MaterialIcons
                      name="error-outline"
                      className="mr-4"
                      color={colors.gray['400']}
                      size={25}
                    />
                    <Text className="text-white text-xl">
                      Delete transaction?
                    </Text>
                  </View>
                  <TouchableOpacity onPress={props.onRequestClose}>
                    <MaterialIcons
                      name="close"
                      color={colors.gray['800']}
                      size={25}
                    />
                  </TouchableOpacity>
                </View>

                <View className="p-3 flex-1 border-b border-gray-300 items-center justify-center">
                  <Text className="text-gray-500 text-lg leading-8">
                    Are you sure you want to delete this transaction? This
                    action cannot be undone.
                  </Text>
                </View>

                <View className="flex-row justify-end gap-4 w-full p-6 pb-0 pr-0">
                  <TouchableOpacity
                    className="w-[100] bg-none border-2 border-accent-brand items-center justify-center p-3 rounded-[6]"
                    onPress={props.onRequestClose}
                  >
                    <Text className="text-accent-brand">Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="w-[100] bg-none bg-accent-red-background-primary items-center justify-center p-3 rounded-[6]"
                    onPress={handleDeleteTransaction}
                    disabled={isPending}
                  >
                    {isPending ? (
                      <ActivityIndicator size="small" color={colors.white} />
                    ) : (
                      <Text className="text-white">Delete</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  )
}
