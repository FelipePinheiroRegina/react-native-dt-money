import { colors } from '@/shared/colors'
import { MaterialIcons } from '@expo/vector-icons'
import { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { DeleteModal } from './DeleteModal'

export const RightAction = ({ transactionId }: { transactionId: number }) => {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <>
      <TouchableOpacity
        className="h-[140] bg-accent-red-background-primary w-[80] rounded-r-[6] items-center justify-center"
        onPress={() => setModalVisible(true)}
      >
        <MaterialIcons name="delete" color={colors.white} size={30} />
      </TouchableOpacity>

      <DeleteModal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        transactionId={transactionId}
      />
    </>
  )
}
