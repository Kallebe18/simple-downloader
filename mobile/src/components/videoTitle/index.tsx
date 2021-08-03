import React from 'react'
import { TextProps } from 'react-native'

import { VideoTitleContainer } from './styles'

interface VideoTitleProps extends TextProps {
  text: string
}

export const VideoTitle = ({ text }: VideoTitleProps) => {
  return (
    <VideoTitleContainer>
      {text}
    </VideoTitleContainer>
  )
}