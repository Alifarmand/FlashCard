import { AppLoading } from 'expo'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import styled from 'styled-components'
import { colors, SubmitText, SubtmitButton } from '../utils/constants'
import { withNavigationFocus } from 'react-navigation-is-focused-hoc'
import { getDecks } from '../utils/api'

class Home extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Home',
    }
  }
  static propTypes = {
    isFocused: PropTypes.bool.isRequired,
  }
  state = {
    ready: false,
    decks: {},
  }

  getMyDecks = async () => {
    const decks = await getDecks()
    this.setState(() => ({decks: JSON.parse(decks), ready: true}))
    this.forceUpdate()
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.isFocused && nextProps.isFocused) {
      this.getMyDecks()
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
    this.getMyDecks()
  }

  render () {
    const {ready, decks} = this.state

    if (ready === false) {
      return <AppLoading />
    }

    let deckItems = []
    _.forOwn(decks, (deck, title) => {
      deckItems.push({title, cardsNo: deck.questions.length})
    })

    const items = deckItems.map(item => (
      <SingleDeck
        key={item.title}
        onPress={() =>
          //Passing parameters to next view
          this.props.navigation.navigate('DeckDetail', {
            title: item.title,
            cardsNo: item.cardsNo,
          })
        }
      >
        <Title >{item.title}</Title >
        <SubTitle >{`${item.cardsNo} cards`}</SubTitle >
      </SingleDeck >
    ))

    return deckItems.length === 0 ? (
      <Content >
        <SubtmitButton
          onPress={() => this.props.navigation.navigate('AddDeck', {})}
        >
          <SubmitText >Create your first deck</SubmitText >
        </SubtmitButton >
      </Content >
    ) : (
      <ScrollView style={{backgroundColor: colors.paper}}>
        <Container>
          {items}
        </Container>
      </ScrollView >
    )
  }
}

export const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${ colors.paper }
`

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-start;
`

export const SingleDeck = styled.TouchableOpacity`
  width: 90%;
  padding: 40px 20px;
  margin: 20px 20px 0;
  border-radius: 10px;
  background-color: ${ colors.brown };
`

const Title = styled.Text`
  font-size: 24;
  color: ${ colors.white };
  text-align: center;
  margin: 20px;
`

const SubTitle = styled.Text`
  font-size: 16;
  color: ${ colors.lightBrown };
  text-align: center;
`
export default withNavigationFocus(Home)
