import { useBottomSheetContext } from '@/context/BottomSheetContext'
import { colors } from '@/shared/colors'
import { MaterialIcons } from '@expo/vector-icons'
import { useState, useTransition } from 'react'
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import CurrencyInput from 'react-native-currency-input'

import * as y from 'yup'

import { useTransactionContext } from '@/context/TransactionContext'
import { useErrorHandler } from '@/shared/hooks/useErrorHandler'
import { useSnackbarContext } from '@/context/SnackbarContext'
import { ErrorMessage } from '@/components/ErrorMessage'
import { SelectCategoryModal } from '@/components/SelectCategoryModal'
import { TransactionTypeSelector } from '@/components/SelectType'
import { Button } from '@/components/Button'
import { editTransactionSchema } from './schema'
import type { Transaction } from '@/shared/interfaces/https/get-transactions-response'
import type { UpdateTransactionRequest } from '@/shared/interfaces/https/update-transaction-request'

type ValidationError = Record<keyof UpdateTransactionRequest, string>

interface EditTransactionFormProps {
  initialTransaction: Transaction
}

export function EditTransactionForm({
  initialTransaction,
}: EditTransactionFormProps) {
  const { closeBottomSheet } = useBottomSheetContext()
  const { updateTransaction } = useTransactionContext()
  const { handleError } = useErrorHandler()
  const [transaction, setTransaction] = useState<UpdateTransactionRequest>({
    id: initialTransaction.id,
    description: initialTransaction.description,
    typeId: initialTransaction.typeId,
    categoryId: initialTransaction.categoryId,
    value: initialTransaction.value,
  })

  const { notify } = useSnackbarContext()
  const [errors, setErrors] = useState<ValidationError | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleChangeTransactionData(
    key: keyof UpdateTransactionRequest,
    value: string | number
  ) {
    setTransaction((prev) => ({ ...prev, [key]: value }))
  }

  async function handleCreateTransaction() {
    startTransition(async () => {
      try {
        await editTransactionSchema.validate(transaction, {
          abortEarly: false,
        })

        await updateTransaction(transaction)
        closeBottomSheet()
        notify({
          messageType: 'success',
          message: 'Transaction updated successfully',
        })
      } catch (error) {
        if (error instanceof y.ValidationError) {
          const errors = {} as ValidationError

          error.inner.forEach((err) => {
            if (err.path) {
              errors[err.path as keyof UpdateTransactionRequest] = err.message
            }
          })

          setErrors(errors)
        } else {
          handleError(error, 'An error occurred while updating the transaction')
        }
      }
    })
  }

  return (
    <View className="px-8 py-5">
      <TouchableOpacity
        className="w-full flex-row items-center justify-between"
        onPress={closeBottomSheet}
      >
        <Text className="text-white text-xl font-bold">Edit transaction</Text>
        <MaterialIcons name="close" color={colors.gray['700']} size={20} />
      </TouchableOpacity>

      <View className="flex-1 mt-8 mb-8">
        <TextInput
          placeholder="Description"
          placeholderTextColor={colors.gray['700']}
          value={transaction.description}
          onChangeText={(text) =>
            handleChangeTransactionData('description', text)
          }
          className="text-white text-lg h-[50px] bg-background-primary my-2 rounded-[6px] pl-4"
        />

        {errors?.description && (
          <ErrorMessage>{errors.description}</ErrorMessage>
        )}

        <CurrencyInput
          className="text-white text-lg h-[50px] bg-background-primary my-2 rounded-[6px] pl-4"
          value={transaction.value}
          prefix="R$ "
          delimiter="."
          separator=","
          precision={2}
          minValue={0}
          onChangeValue={(value) =>
            handleChangeTransactionData('value', value ?? 0)
          }
        />

        {errors?.value && <ErrorMessage>{errors.value}</ErrorMessage>}

        <SelectCategoryModal
          selectedCategoryId={transaction.categoryId}
          onSelect={(categoryId) =>
            handleChangeTransactionData('categoryId', categoryId)
          }
        />

        {errors?.categoryId && <ErrorMessage>{errors.categoryId}</ErrorMessage>}

        <TransactionTypeSelector
          typeId={transaction.typeId}
          setTransactionType={(typeId) =>
            handleChangeTransactionData('typeId', typeId)
          }
        />

        {errors?.typeId && <ErrorMessage>{errors.typeId}</ErrorMessage>}

        <View className="my-4">
          <Button onPress={handleCreateTransaction} disabled={isPending}>
            {isPending ? (
              <ActivityIndicator size="small" color={colors.white} />
            ) : (
              'Update'
            )}
          </Button>
        </View>
      </View>
    </View>
  )
}
