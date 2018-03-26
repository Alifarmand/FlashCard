import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import styled from 'styled-components'

const store = createStore(reducer, applyMiddleware(thunk))

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Wrapper>
          <Text>Testing if this works!</Text>
          <Text>YES IT DOES!</Text>
        </Wrapper>
      </Provider>
    );
  }
}

const Wrapper = styled.View`
  flex: 1;
  justifyContent: center;
  background-color: #EBEBEB;
  align-items: center;
`
