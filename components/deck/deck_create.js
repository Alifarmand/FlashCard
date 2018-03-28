import React, { Component } from 'react'
import { Alert, KeyboardAvoidingView, View, Platform } from 'react-native'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { actions } from '../../reducers/index'
import {
  appString,
  colors,
  SubtmitButton,
  SubmitText,
  Input
} from '../../utils/constants'

class CreateDeck extends Component {
  static navigationOptions = {
    header: null,
  }
  state = {
    title: '',
  }
  onTextInputChange = text => {
    this.setState(state => {
      return Object.assign({}, state, {
        title: text,
      })
    })
  }

  onSubmit = () => {
    if (this.state.title === '') {
      Alert.alert(
        appString.deck.empty,
        appString.deck.emptyHelp,
        [
          {
            text: 'OK',
            onPress: () => {},
          },
        ],
        {cancelable: false},
      )
    } else {
      const {navigate} = this.props.navigation
      this.props.addDeck({title: this.state.title}).then(() => {
        navigate('DeckDetails', {title: this.state.title, questions: []})
      })
    }
  }

  render () {
    return (
      <Container >
        <Content >
          <Title >{appString.card.create}</Title >
          <Input
            value={this.state.title}
            onChangeText={this.onTextInputChange}
            placeholder={appString.card.namePlaceholder}
          />
        </Content >
        <View >
          <SubtmitButton onPress={this.onSubmit} >
            <SubmitText >Submit</SubmitText >
          </SubtmitButton >
        </View >
      </Container >
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addDeck: ({title}) => dispatch(actions.createDeck({title})),
})

export default connect(null, mapDispatchToProps)(CreateDeck)

const Container = styled(KeyboardAvoidingView).attrs({behavior: 'padding',})`
  flex: 1;
  background-color: ${colors.white};
  align-items: center;
  justify-content: center;
  border-color: ${colors.white};
  border-top-width: 40px;
  border-bottom-width: 40px;
`
const Content = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`
const Title = styled.Text`
  font-size: 24;
  font-weight: bold;
  text-align: center;
  color: ${colors.brown}
`

