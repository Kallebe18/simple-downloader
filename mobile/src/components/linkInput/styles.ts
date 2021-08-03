import styled from 'styled-components/native'
import { Dimensions } from 'react-native'

export const LinkTextInputContainer = styled.View<{  borderColor: string }>`
  width: ${Dimensions.get('window').width - 30}px;
  border-radius: 20px;
  padding: 5px 20px;
  background-color: #fff;
  margin: 10px;
  color: #000;
  font-size: 16px;
  border-width: 2px;
  border-color: ${props => props.borderColor};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const LinkTextInput = styled.TextInput`
  margin-right: 5px;
  width: 220px;
`
