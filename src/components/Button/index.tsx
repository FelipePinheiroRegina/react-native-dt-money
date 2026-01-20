import { colors } from '@/shared/colors'
import { MaterialIcons } from '@expo/vector-icons'
import clsx from 'clsx'
import type { ReactNode } from 'react'
import {
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
} from 'react-native'

type ButtonVariant = 'filled' | 'outline'

interface ButtonProps extends TouchableOpacityProps {
  children: ReactNode
  variant?: ButtonVariant
  iconName?: keyof typeof MaterialIcons.glyphMap
  widthFull?: boolean
}

export function Button({
  children,
  variant = 'filled',
  iconName,
  className,
  widthFull = true,
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      className={clsx(
        widthFull && 'w-full',
        'rounded-lg px-5 flex-row items-center h-button',
        iconName ? 'justify-between' : 'justify-center',
        variant === 'filled' && 'bg-accent-brand',
        variant === 'outline' && 'bg-none border-[1px] border-accent-brand',
        props.disabled && 'opacity-50',
        className
      )}
      {...props}
    >
      <Text
        className={clsx(
          'text-base',
          variant === 'filled' && 'text-white',
          variant === 'outline' && 'text-accent-brand'
        )}
      >
        {children}
      </Text>
      {iconName && (
        <MaterialIcons
          name={iconName}
          size={24}
          color={variant === 'filled' ? colors.white : colors['accent-brand']}
        />
      )}
    </TouchableOpacity>
  )
}
