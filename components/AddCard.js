import React, { Component } from 'react'
import { NavigationActions } from 'react-navigation'
import styled from 'styled-components'
import { addCardToDeck } from '../utils/api'
import { colors, SubmitText, SubtmitButton, Input } from '../utils/constants'

class AddCard extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Add Card',
    }
  }

  constructor () {
    super()
    this.state = {
      question: '',
      answer: '',
    }
  }

  validation () {
    const {question, answer} = this.state
    return question.length > 0 && answer.length > 0
  }

  onSubmitClick = (evt) => {
    const {title} = this.props.navigation.state.params
    if (!this.validation()) {
      evt.preventDefault()
      return
    }

    addCardToDeck(title, {
      question: this.state.question,
      answer: this.state.answer,
    })
    this.setState(() => ({question: '', answer: ''}))
    this.toHome()
  }

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({key: 'AddCard'}))
  }

  render () {
    const isEnabled = this.validation()
    return (
      <Container behavior='padding' >
        <Input
          placeholder='Question'
          onChangeText={text => this.setState({question: text})}
          value={this.state.question}
        />
        <Input
          placeholder='Answer'
          onChangeText={text => this.setState({answer: text})}
          value={this.state.answer}
        />
        <SubtmitButton onPress={this.onSubmitClick} disbled={!isEnabled}>
          <SubmitText >Submit</SubmitText >
        </SubtmitButton >
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

export default AddCard
