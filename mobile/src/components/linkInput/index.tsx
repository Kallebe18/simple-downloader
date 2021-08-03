import React from 'react'
import { TextInputProps, TouchableOpacity } from 'react-native'
import { XCircle } from 'react-native-feather'

import { LinkTextInput, LinkTextInputContainer } from './styles'

interface LinkInputProps extends TextInputProps {
  borderColor: string;
  clearText?: () => void;
}

export const LinkInput = (props: LinkInputProps) => {
  return (
    <LinkTextInputContainer
      borderColor={props.borderColor}
    >
      <LinkTextInput
        {...props}
      />
      <TouchableOpacity onPress={props.clearText}>
        <XCircle
          color='#333'
          strokeWidth='3'
        />
      </TouchableOpacity>
    </LinkTextInputContainer>
  )
}
