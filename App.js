import { Constants } from 'expo'
import React from 'react'
import { StatusBar, View } from 'react-native'
import { StackNavigator, TabNavigator } from 'react-navigation'
import { updateFocus } from 'react-navigation-is-focused-hoc'
import AddCard from './components/AddCard'
import AddDeck from './components/AddDeck'
import DeckDetail from './components/DeckDetail'
import Home from './components/Home'
import Quiz from './components/Quiz'
import { setNotification } from './utils/api'
import { colors } from './utils/constants'
import styled from 'styled-components'

const Tabs = TabNavigator({
  Decks: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Home',
    },
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Create Deck',
    },
  },
}, {
  navigationOptions: {
    header: null,
  },
  tabBarOptions: {
    activeTintColor: colors.white,
    tintColor: colors.lightBrown,
    style: {
      height: 56,
      backgroundColor: colors.brown,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 6,
      shadowOpacity: 1,
    },
  },
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      headerTintColor: colors.white,
      headerStyle: {
        backgroundColor: colors.brown,
      },
    },
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: colors.white,
      headerStyle: {
        backgroundColor: colors.brown,
      },
    },
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: colors.white,
      headerStyle: {
        backgroundColor: colors.brown,
      },
    },
  },
})

function Statusbar ({backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}} >
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View >
  )
}

export default class App extends React.Component {
  componentDidMount () {
    setNotification()
  }

  render () {
    return (
      <Container >
        <Statusbar backgroundColor={colors.brown} barStyle='light-content' />
        <MainNavigator
          onNavigationStateChange={(prevState, currentState) => {
            updateFocus(currentState)
          }}
        />
      </Container >
    )
  }
}

const Container = styled.View`
  flex: 1;
`