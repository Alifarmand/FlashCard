import React, { Component } from 'react'
import {
  KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput,
  TouchableOpacity,
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import { saveDeckTitle } from '../utils/api'
import styled from 'styled-components'
import { colors, SubmitText, SubtmitButton, Input } from '../utils/constants'

class AddDeck extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Create Deck',
    }
  }
  state = {
    title: '',
    buttonState: true,
  }

  submit = (evt) => {
    evt.preventDefault()
    this.toHome()
    saveDeckTitle(this.state.title)
    this.setState(() => ({title: ''}))
  }

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({key: 'AddDeck'}))
  }

  render () {
    return (
      <Container behavior='padding' >
        <Title>What is the title of the deck?</Title >
        <Input
          placeholder='Title for the deck'
          onChangeText={text =>
            this.setState({title: text, buttonState: false})
          }
          value={this.state.title}
        />
        <SubtmitButton onPress={this.submit} disabled={this.state.buttonState}>
          <SubmitText>Submit</SubmitText>
        </SubtmitButton>
      </Container >
    )
  }
}


const Container = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${ colors.paper };
`

const Title = styled.Text`
  font-size: 24;
  color: ${ colors.brown };
  margin: 20px;
`

export default AddDeck
