import React, { Component } from 'react'
import { Constants } from 'expo'
import { StackNavigator, TabNavigator } from 'react-navigation'
import CreateDeck from './createDeck'
import styled from 'styled-components'

const Stack = StackNavigator({
    Decks: {
      screen: TabNavigator({
        Home: {
          screen: CreateDeck,
          navigationOptions: {
            tabBarLabel: 'Create Deck'
          }
        }
      })
    }
  },
  {
    cardStyle: {
      paddingTop: Constants.statusBarHeight
    }
  }
)

class Navigator extends Component {
  render () {
    return (
      <Container>
        <Stack />
      </Container>
    )
  }
}

export default Navigator

const Container = styled.View`
  flex: 1;
`