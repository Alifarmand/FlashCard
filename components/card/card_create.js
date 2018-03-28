import React, { Component } from 'react'
import {
  Alert, KeyboardAvoidingView, Text, TextInput,
  View,
} from 'react-native'
import CheckBox from 'react-native-check-box'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { actions } from '../../reducers/index'
import { colors, SubtmitButton, SubmitText, Input } from '../../utils/constants'

class CreateCard extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add Card'
    }
  }

  state = {
    question: '',
    answer: '',
    deck: '',
    isCorrect: false
  }
  /**
   * "submitting" the fomr
   */
  onSubmit = () => {
    // validate
    if (this.state.question === '' || this.state.answer === '') {
      Alert.alert(
        'Empty Field',
        "The question or answer can't be empty",
        [
          {
            text: 'OK',
            onPress: () => {}
          }
        ],
        { cancelable: false }
      )
    } else {
      // add card and goto deck
      const { navigate } = this.props.navigation
      this.props
        .addCard({
          question: this.state.question,
          answer: this.state.answer,
          deckId: this.state.deck,
          isCorrect: this.state.isCorrect
        })
        .then(() => {
          navigate('DeckDetails', { title: this.state.deck })
        })
    }
  }

  componentDidMount() {
    const { params } = this.props.navigation.state
    this.setState({
      deck: params.deck
    })
  }

  render() {
    const leftText = 'Is Correct?'
    return (
      <Container>
        <Content>
          <Input
            value={this.state.question}
            onChangeText={text => {
              this.setState(state => {
                return Object.assign({}, state, {
                  question: text
                })
              })
            }}
            placeholder="Write a question here"
          />
          <Input
            value={this.state.answer}
            onChangeText={text => {
              this.setState(state => {
                return Object.assign({}, state, {
                  answer: text
                })
              })
            }}
            numberOfLines={2}
            multiline={true}
            placeholder="Type the answer"
          />
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text>{leftText}</Text>
            <CheckBox
              value={this.state.isCorrect}
              onClick={() => {
                this.setState(state => {
                  return Object.assign({}, state, {
                    isCorrect: !state.isCorrect
                  })
                })
              }}
            />
          </View>
          <SubtmitButton onPress={this.onSubmit}>
            <SubmitText>Submit</SubmitText>
          </SubtmitButton>
        </Content>
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addCard: ({ question, answer, deckId, isCorrect }) =>
    dispatch(actions.createCard({ question, answer, deckId, isCorrect }))
})

export default connect(null, mapDispatchToProps)(CreateCard)

const Container = styled.View`
  flex: 1;
  background-color: ${colors.white};
  align-items: center;
  justify-content: center;
  border-color: ${colors.white};
  border-top-width: 40;
  border-bottom-width: 40;
`
const Content = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`