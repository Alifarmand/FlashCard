import _ from 'lodash'
import React, { Component } from 'react'
import { ScrollView, TouchableOpacity, View, Text } from 'react-native'
import FlipCard from 'react-native-flip-card'
import styled from 'styled-components'
import {
  clearNotification, getDeck,
  setNotification,
} from '../utils/api'
import { colors, SubmitText, SubtmitButton } from '../utils/constants'

class Quiz extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Quiz',
    }
  }

  constructor () {
    super()
    this.state = {
      questions: [],
      done: false,
      isFlipped: false,
    }
  }

  componentDidMount () {
    this.startQuiz()
  }

  onFlipClick = () => {
    this.setState(state =>
      Object.assign({}, state, {
        isFlipped: !this.state.isFlipped,
      }),
    )
  }

  startQuiz () {
    const {title} = this.props.navigation.state.params

    getDeck(title).then(deck => {
      const questions = deck.questions.map(question => {
        question.response = null
        return question
      })
      this.setState(() => ({questions, done: false, isFlipped: false}))
    })
  }

  correctClickHandler = (questions, currentQuestion, unansweredQuestions) => {
    const index = _.findIndex(questions, {
      question: currentQuestion.question,
    })
    currentQuestion.response = true
    questions.splice(index, 1, currentQuestion)
    let isDone = false
    if (unansweredQuestions.length === 1) {
      isDone = true
    }
    this.setState(() => ({
      questions,
      done: isDone,
      isFlipped: false,
    }))
  }

  incorrectClickHandler = (questions, currentQuestion, unansweredQuestions) => {
    const index = _.findIndex(questions, {
      question: currentQuestion.question,
    })
    currentQuestion.response = false
    questions.splice(index, 1, currentQuestion)
    let isDone = false
    if (unansweredQuestions.length === 1) {
      isDone = true
    }
    this.setState(() => ({
      questions,
      done: isDone,
      isFlipped: false,
    }))
  }

  render () {
    const {questions, done} = this.state
    let unansweredQuestions = []
    let currentQuestion = null
    let score = ''
    if (questions.length > 0) {
      unansweredQuestions = _.filter(questions, question =>
        _.isNil(question.response),
      )
      //Cronological order for currect question
      if (unansweredQuestions.length > 0) {
        currentQuestion = unansweredQuestions[0]
      }
    }
    if (done) {
      const correctAnswers = _.filter(questions, question => question.response).length
      score = `You scored ${correctAnswers} out of ${questions.length} questions.`
      clearNotification().then(setNotification)
    }
    return (
      <Container >
        {!_.isNil(currentQuestion) &&
        <ContentWrapper >
          <StyledFlipCard
            clickable={false}
            perspective={1000}
            flip={this.state.isFlipped}
          >
            <ScrollView >
              <CardTitle >{currentQuestion.question}</CardTitle >
            </ScrollView >
            <ScrollView >
              <CardTitle >{currentQuestion.answer}</CardTitle >
            </ScrollView >
          </StyledFlipCard >
          <FlipButton onPress={this.onFlipClick} >
            {this.state.isFlipped
              ? <FlipButtonText >Question</FlipButtonText >
              : <FlipButtonText >Answer</FlipButtonText >
            }
          </FlipButton >
        </ContentWrapper >
        }
        {this.state.done && (
          //Needs to be done
          <ScoreView >
            <Score >{score}</Score >
            <SubtmitButton onPress={() => this.startQuiz()} >
              <SubmitText >Restart Quiz</SubmitText >
            </SubtmitButton >
            <SubtmitButton onPress={() => this.props.navigation.goBack()} >
              <SubmitText >Back to Deck</SubmitText >
            </SubtmitButton >
          </ScoreView >
        )}
        {!_.isNil(currentQuestion) &&
        _.isNil(currentQuestion.response) &&
        <ActionButtons >
          <CorrectButton
            onPress={() => this.correctClickHandler(questions, currentQuestion,
              unansweredQuestions)} >
            <SubmitText style={{color: colors.white}} >Correct</SubmitText >
          </CorrectButton >
          <IncorrectButton
            onPress={() => this.incorrectClickHandler(questions,
              currentQuestion, unansweredQuestions)} >
            <SubmitText style={{color: colors.white}} >Incorrect</SubmitText >
          </IncorrectButton >
        </ActionButtons >
        }
        {!_.isNil(currentQuestion) &&
        <DeckCount >
          <Counting >{`${questions.length - unansweredQuestions.length +
          1}/${questions.length}`}</Counting >
        </DeckCount >
        }
      </Container >
    )
  }
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${ colors.paper };
`

const ScoreView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${ colors.paper };
`

const DeckCount = styled.View`
  position: absolute;
  top: 20px;
  left: 20px;
`

const ActionButtons = styled.View`
  flex: 1;
`

const Counting = styled.Text`
  text-align: center;
  color: ${ colors.lightBrown };
`

const Score = styled.Text`
  text-align: center;
  font-size: 20px;
  color: ${ colors.lightBrown };
  margin-bottom: 40px;
`

const ContentWrapper = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  margin: 20px;
`

const StyledFlipCard = styled(FlipCard)`
  margin-top: 40px;
  margin-bottom: 20px;
  background-color: ${ colors.brown };
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 10px;
  min-width: 90%;
`

const CardTitle = styled(Text)`
  font-size: 20;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
  color: ${ colors.white };
`

const Button = styled(TouchableOpacity)`
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  min-width: 40%;
`
const ButtonText = styled(Text)`
  font-weight: bold;
  color: #fff;
  text-align: center;
`

const FlipButton = Button.extend`
  background-color: ${ colors.lightBrown };
`

const FlipButtonText = ButtonText.extend`
  color: ${ colors.white };
`

const CorrectButton = SubtmitButton.extend`
  background-color: ${colors.green};
  border: 0;
`

const IncorrectButton = SubtmitButton.extend`
  background-color: ${colors.red};
  border: 0;
`

export default Quiz
