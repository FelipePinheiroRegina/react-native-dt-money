import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from 'react-hook-form'
import {
  Text,
  TextInput,
  type TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { colors } from '@/shared/colors'
import clsx from 'clsx'
import { useState } from 'react'
import { useRef } from 'react'
import { ErrorMessage } from '../ErrorMessage'

interface InputParams<T extends FieldValues> extends TextInputProps {
  control: Control<T>
  name: Path<T>
  leftIconName?: keyof typeof MaterialIcons.glyphMap
  label?: string
}

export function Input<T extends FieldValues>({
  control,
  name,
  leftIconName,
  label,
  secureTextEntry,
  ...props
}: InputParams<T>) {
  const [isFocused, setIsFocused] = useState(false)
  const [showTextPassword, setShowTextPassword] = useState(secureTextEntry)
  const inputRef = useRef<TextInput>(null)

  function checkedFocus() {
    if (inputRef.current) {
      setIsFocused(inputRef.current.isFocused())
    }
  }
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <View className="w-full">
            {label && (
              <Text
                className={clsx(
                  'mb-2 mt-3 text-base',
                  isFocused ? 'text-accent-brand' : 'text-gray-600'
                )}
              >
                {label}
              </Text>
            )}
            <TouchableOpacity className="flex-row items-center justify-between border-b-[1px] border-gray-600 px-3 py-2 h-16">
              {leftIconName && (
                <MaterialIcons
                  name={leftIconName}
                  size={24}
                  color={isFocused ? colors['accent-brand'] : colors.gray[600]}
                  className="mr-2"
                />
              )}
              <TextInput
                ref={inputRef}
                className="flex-1 text-base text-gray-500"
                onFocus={checkedFocus}
                onEndEditing={checkedFocus}
                value={value}
                onChangeText={onChange}
                secureTextEntry={showTextPassword}
                {...props}
                placeholderTextColor={colors.gray[700]}
              />

              {secureTextEntry && (
                <TouchableOpacity
                  onPress={() => setShowTextPassword((prev) => !prev)}
                >
                  <MaterialIcons
                    name={showTextPassword ? 'visibility' : 'visibility-off'}
                    size={24}
                    color={colors.gray[600]}
                  />
                </TouchableOpacity>
              )}
            </TouchableOpacity>

            {error && <ErrorMessage>{error.message}</ErrorMessage>}
          </View>
        )
      }}
    />
  )
}
