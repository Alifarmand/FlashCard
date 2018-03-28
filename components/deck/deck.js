import React, { Component } from 'react'
import { Text } from 'react-native'
import DeckDetails from './deck_detail'
import styled from 'styled-components'
import { colors } from '../../utils/constants'

class Deck extends Component {
  render () {
    const { navigate } = this.props.navigation
    return (
      <DeckButton
        onPress={() =>
          navigate('DeckDetails', {
            title: this.props.title,
            questions: this.props.questions
          })
        }
      >
        <DeckTitle>{this.props.title}</DeckTitle>
        <Text>{this.props.questions.length} cards</Text>
      </DeckButton>
    )
  }
}

export default Deck

const DeckButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  padding: 40px 10px;
  min-width: 100%;
  border-radius: 10px;
  background-color: ${colors.lightBrown};
`

const DeckTitle = styled(Text)`
  font-size: 24;
  font-weight: bold;
  text-align: center;
  margin: 20px;
  color: ${colors.brown};
`
