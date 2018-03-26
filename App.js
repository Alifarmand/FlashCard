import React from 'react'
import { Text, View } from 'react-native'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import styled from 'styled-components'
import Navigator from './components/Navigator'
import reducer from './reducers'

const store = createStore(reducer, applyMiddleware(thunk))

export default class App extends React.Component {
  render () {
    return (
      <Provider store={store} >
        <Wrapper >
          <Navigator />
        </Wrapper >
      </Provider >
    )
  }
}

const Wrapper = styled.View`
  flex: 1;
  justifyContent: center;
  background-color: #EBEBEB;
  align-items: center;
`
