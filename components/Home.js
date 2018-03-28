import { StackNavigator, TabNavigator } from 'react-navigation'
import React, { Component } from 'react'
import { StatusBar, View } from 'react-native'
import DeckList from './deck/deck_list'
import DeckDetails from './deck/deck_detail'
import CreateDeck from './deck/deck_create'
import CreateCard from './card/card_create'
import Card from './card/card'
import { Constants } from 'expo'
import Results from './Results'
import styled from 'styled-components'
import { colors } from '../utils/constants'

function StatBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Stack = StackNavigator(
  {
    Decks: {
      screen: TabNavigator({
        Home: {
          screen: DeckList,
          navigationOptions: {
            tabBarLabel: 'All Decks',
          }
        },
        Create: {
          screen: CreateDeck,
          navigationOptions: {
            tabBarLabel: 'Create Deck',
          }
        }
      },{
        tabBarOptions : {
          style: {
            height: 56,
            backgroundColor: colors.brown,
          },
          activeTintColor: colors.tomato,
          inactiveTintColor: colors.lightBrown
        }
      })
    },
    Test: {
      screen: Card
    },
    CreateCard: {
      screen: CreateCard
    },
    Results: {
      screen: Results
    },
    DeckDetails: {
      screen: DeckDetails
    }
  }
)

class Home extends Component {
  render () {
    return (
      <Container>
        <StatBar backgroundColor={colors.brown} barStyle="light-content"/>
        <Stack />
      </Container>
    )
  }
}

export default Home

const Container = styled.View`
  flex: 1;
  align-self: stretch;
`
