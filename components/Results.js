import React, { Component } from 'react'
import { View } from 'react-native'
import { NavigationActions } from 'react-navigation'
import styled from 'styled-components'
import { colors } from '../utils/constants'

class Results extends Component {
  /**
   * evaluate the results of quiz
   */
  getResults = questions => {
    const correct = 'correct'
    const incorrect = 'incorrect'
    let correctQuestions = questions.filter(question => {
      if (
        (question.isCorrect && question.optionSelected === correct) ||
        (!question.isCorrect && question.optionSelected === incorrect)
      )
        return true
    })
    return {
      totalQuestions: questions.length,
      correctQuestions: correctQuestions.length,
      incorrectQuestions: questions.length - correctQuestions.length,
    }
  }

  /**
   * back to index
   */
  onBackToDecksClick = () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'Decks'})],
    })
    this.props.navigation.dispatch(resetAction)
  }

  /**
   * return to deck
   */
  onBackToDeckClick = () => {
    const {params} = this.props.navigation.state
    const {navigate} = this.props.navigation
    navigate('DeckDetails', {
      questions: params.questions,
      title: params.deck,
    })
  }

  /**
   * restart quiz
   */
  onRestartClick = () => {
    const {params} = this.props.navigation.state
    const {navigate} = this.props.navigation
    navigate('Test', {questions: params.questions, deck: params.deck})
  }

  render () {
    const {params} = this.props.navigation.state
    const score = this.getResults(params.questions)
    return (
      <Container >
        <ContentContainer >
          <StyledText >Total questions: {score.totalQuestions}</StyledText >
          <StyledText >
            Total correct questions: {score.correctQuestions}
          </StyledText >
          <StyledText >
            Total incorrect questions: {score.incorrectQuestions}
          </StyledText >
        </ContentContainer >
        <View >
          <RestartBtn onPress={this.onRestartClick} >
            <RestartText >Restart test</RestartText >
          </RestartBtn >
          <HomeBtn onPress={this.onBackToDeckClick} >
            <HomeText >Back to Deck</HomeText >
          </HomeBtn >
          <HomeBtn onPress={this.onBackToDecksClick} >
            <HomeText >Home</HomeText >
          </HomeBtn >
        </View >
      </Container >
    )
  }
}

export default Results

const Container = styled.View`
  flex: 1;
  background-color: ${colors.white};
  align-items: center;
  justify-content: center;
  border-color: ${colors.white};
  border-top-width: 40;
  border-bottom-width: 40;
  min-width: 100%;
`
const ContentContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
`
const Title = styled.Text`
  font-size: 24;
  font-weight: bold;
`
const StyledText = styled.Text`
  font-size: 14;
  font-weight: bold;
`
const RestartBtn = styled.TouchableOpacity`
  padding: 10px;
  margin: 5px;
  background-color: ${colors.white};
  border-radius: 10;
  border-width: 1;
  border-color: #000;
  min-width: 80%;
`
const RestartText = styled.Text`
  font-weight: bold;
  color: #000;
  text-align: center;
`
const HomeBtn = styled.TouchableOpacity`
  padding: 10px;
  margin: 5px;
  background-color: #000;
  border-radius: 10;
  border-width: 1;
  border-color: #000;
  min-width: 80%;
`
const HomeText = styled.Text`
  font-weight: bold;
  color: ${colors.white};
  text-align: center;
`
