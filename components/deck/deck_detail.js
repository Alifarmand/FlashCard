import React, { Component } from 'react'
import { Text } from 'react-native'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { colors, SubmitText, SubtmitButton } from '../../utils/constants'
import { API } from '../../utils/api'

class DeckDetails extends Component {
  state = {
    deck: {
      questions: [],
    },
  }

  /**
   * handle card click
   */
  onAddCardClick = () => {
    const {navigate} = this.props.navigation
    navigate('CreateCard', {deck: this.state.deck.title})
  }

  /**
   * handle start quiz
   */
  onStartTestClick = () => {
    API.clearNotification().then(() => API.setNotification())
    const {navigate} = this.props.navigation
    navigate('Test', {
      questions: this.state.deck.questions,
      deck: this.state.deck.title,
    })
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      deck: nextProps.deck,
    })
  }

  componentDidMount () {
    this.setState({
      deck: this.props.deck,
    })
  }

  render () {
    let deck = this.state.deck
    return (
      <Container >
        <Content >
          <Title >{deck.title}</Title >
          <Text >{deck.questions.length} cards</Text >
        </Content >

        <LowerContent >
          <SubtmitButton onPress={this.onAddCardClick} >
            <SubmitText >Add Card</SubmitText >
          </SubtmitButton >
          {deck.questions.length > 0 &&
            <SubtmitButton onPress={this.onStartTestClick} >
              <SubmitText >Start Test</SubmitText >
            </SubtmitButton >
          }
        </LowerContent >
      </Container >
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    deck: state[props.navigation.state.params.title],
  }
}

export default connect(mapStateToProps, null)(DeckDetails)

const Container = styled.View`
  flex: 1;
  background-color: ${colors.white};
  align-items: center;
  justify-content: center;
`

const Content = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`
const Title = styled.Text`
  font-size: 36px;
  font-weight: bold;
  color: ${ colors.brown };
`

const LowerContent = styled.View`
  margin-bottom: 30px;
`