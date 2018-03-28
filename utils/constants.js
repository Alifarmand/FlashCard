import styled from 'styled-components'
import { Platform } from 'react-native'

export const appString = {
  card: {
    create: "Enter name of the Deck!",
    namePlaceholder: "The sillier the better",
    empty: "Go ahead and create your first card!"
  },
  deck: {
    empty: "Ups, field is empty",
    emptyHelp: "Please fill in the field"
  }
}

export const colors = {
  white: '#FFEECE',
  brown: '#241616',
  lightBrown: '#734646',
  paper: '#FFD88F',
  orange: '#F27D52'
}

export const SubtmitButton = styled.TouchableOpacity`
  padding: 16px 0;
  background-color: ${Platform.OS === 'ios' ? 'transparent' : colors.orange};
  border: ${Platform.OS === 'ios' ? '2px solid ' + colors.orange : '0' };
  border-radius: 10px;
  min-width: 80%;
  margin: 10px 0;
`
export const SubmitText = styled.Text`
  font-weight: bold;
  color: ${Platform.OS === 'ios' ? colors.orange : colors.white};
  text-align: center;
  font-size: 16px;
`

export const Input = styled.TextInput`
  min-width: 80%;
  padding: 10px;
  margin: 10px 20px;
  border: 1px solid ${colors.brown}
  border-radius: 10px;
`