import React from 'react'

import { TemplateButtonContainer } from './styles'

export const TemplateButton = (props: any) => {
  return (
    <TemplateButtonContainer {...props}>
      {props.children}
    </TemplateButtonContainer>
  )
}
