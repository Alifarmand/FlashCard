import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Platform, StyleSheet, Text, TouchableOpacity,
  View,
} from 'react-native'
import { withNavigationFocus } from 'react-navigation-is-focused-hoc'
import styled from 'styled-components'
import { getDeck } from '../utils/api'
import { colors, SubmitText, SubtmitButton } from '../utils/constants'

class DeckDetail extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.state.params.title,
    }
  }
  static propTypes = {
    isFocused: PropTypes.bool.isRequired,
  }
  state = {
    cardsNo: 0,
  }

  getMyDeck = async () => {
    const deck = await getDeck(this.props.navigation.state.params.title)
    this.setState({cardsNo: deck.questions.length})
    this.forceUpdate()
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.isFocused && nextProps.isFocused) {
      this.getMyDeck()
    }
    if (this.props.isFocused && !nextProps.isFocused) {
      // screen exit
    }
  }

  shouldComponentUpdate (nextProps) {
    // Update only once after the screen disappears
    if (this.props.isFocused && !nextProps.isFocused) {
      return true
    }

    // Don't update if the screen is not focused
    if (!this.props.isFocused && !nextProps.isFocused) {
      return false
    }

    // Update the screen if its re-enter
    return !this.props.isFocused && nextProps.isFocused
  }

  componentDidMount () {
    this.getMyDeck()
  }

  render () {
    const {title} = this.props.navigation.state.params
    const cardNo = this.state.cardsNo

    return (
      <Content >
        <View style={{marginTop: 20, marginBottom: 40}}>
          <Title >{title}</Title >
          <SubTitle >{ cardNo > 1 ? `${cardNo} cards` : `${cardNo} card`}</SubTitle >
        </View>
            <SubtmitButton onPress={() =>
              this.props.navigation.navigate('AddCard', {
                title,
              })
            }>
              <SubmitText >Add Card</SubmitText >
            </SubtmitButton >
        {this.state.cardsNo > 0 &&
          <SubtmitButton onPress={() =>
            this.props.navigation.navigate('Quiz', {
              title,
            })
          } >
            <SubmitText >Start Quiz</SubmitText >
          </SubtmitButton >
        }
      </Content >
    )
  }
}

const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${ colors.paper }
`
const Title = styled.Text`
  font-size: 24;
  color: ${ colors.brown };
  margin: 20px;
  text-align: center;
`

const SubTitle = styled.Text`
  font-size: 16;
  color: ${ colors.lightBrown };
  text-align: center;
`

export default withNavigationFocus(DeckDetail)
