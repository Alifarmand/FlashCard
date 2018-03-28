import React, { Component } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import FlipCard from 'react-native-flip-card'
import styled from 'styled-components'
import { colors, SubtmitButton, SubmitText } from '../../utils/constants'

class Card extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Test',
    }
  }
  state = {
    deck: null,
    questions: null,
    index: 0,
    flipCard: false,
    finished: false,
  }
  onFlipClick = () => {
    this.setState(state =>
      Object.assign({}, state, {
        flipCard: !this.state.flipCard,
      }),
    )
  }

  onCorrectClick = () => {
    let {questions} = this.state
    questions[this.state.index].optionSelected = 'correct'
    this.setState(prevState => {
      return Object.assign({}, prevState, {
        questions,
        flipCard: false,
        index:
          prevState.index + 1 === questions.length
            ? prevState.index
            : prevState.index + 1,
        finished: prevState.index + 1 === questions.length,
      })
    })
  }
  onIncorrectClick = () => {
    let {questions} = this.state
    questions[this.state.index].optionSelected = 'incorrect'
    this.setState(prevState => {
      return Object.assign({}, prevState, {
        questions,
        flipCard: false,
        index:
          prevState.index + 1 === questions.length
            ? prevState.index
            : prevState.index + 1,
        finished: prevState.index + 1 === questions.length,
      })
    })
  }

  componentWillUpdate (nextProps, nextState) {
    const {navigate} = nextProps.navigation
    if (nextState.finished) {
      navigate('Results', {
        questions: nextState.questions,
        deck: nextState.deck,
      })
    }
  }

  componentDidMount () {
    const {params} = this.props.navigation.state
    this.setState(prevState => {
      return Object.assign({}, prevState, {
        questions: params.questions,
        deck: params.deck,
      })
    })
  }

  render () {
    return (
      <Container >
        <Content >
          <QuestionView
            clickable={false}
            perspective={1000}
            flip={this.state.flipCard}
          >
            <ScrollView >
              <CardTitle >
                {this.state.questions &&
                this.state.questions[this.state.index].question}
              </CardTitle >
            </ScrollView >
            <ScrollView >
              <CardTitle >
                {this.state.questions &&
                this.state.questions[this.state.index].answer}
              </CardTitle >
            </ScrollView >
          </QuestionView >
          <ClueButton onPress={this.onFlipClick} >
            {this.state.flipCard ? (
              <ClueButtonTxt >Question</ClueButtonTxt >
            ) : (
              <ClueButtonTxt >Answer</ClueButtonTxt >
            )}
          </ClueButton >
        </Content >
        <View >
          <SubtmitButton onPress={this.onCorrectClick} >
            <SubmitText >Correct</SubmitText >
          </SubtmitButton >
          <SubtmitButton onPress={this.onIncorrectClick} >
            <SubmitText >Incorrect</SubmitText >
          </SubtmitButton >
          {this.state.questions && (
            <Text style={{color: colors.white, textAlign: 'center'}} >
              Card: {this.state.index + 1}/{this.state.questions.length}
            </Text >
          )}
        </View >
      </Container >
    )
  }
}

export default Card

const Container = styled(View)`
  flex: 1;
  background-color: ${ colors.lightBrown };
  padding: 20px;
  align-items: center;
  justify-content: flex-start;
  min-width: 100%;
`
const Content = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
`

const QuestionView = styled(FlipCard)`
  flex: .5;
  background-color: ${colors.brown};
  align-items: center;
  justify-content: center;
  border-color: ${colors.brown};
  padding: 20px;
  border-radius: 10px;
  min-width: 100%;
  margin-bottom: 20px;
`

const CardTitle = styled(Text)`
  margin-top: 20px;
  font-size: 20;
  font-weight: bold;
  text-align: center;
  color: ${colors.white};
  align-self: center;
`

const Button = styled(TouchableOpacity)`
  padding: 10px;
  margin: 5px;
  border-radius: 10px;
  border-width: 1;
  border-color: #000;
  min-width: 80%;
`
const ButtonText = styled(Text)`
  font-weight: bold;
  color: ${colors.white};
  text-align: center;
`

const ClueButton = Button.extend`
  border: 1px solid ${colors.white};
  margin-top: 10px;
`

const ClueButtonTxt = ButtonText.extend`
  color: ${colors.white};
`
