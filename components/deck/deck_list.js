import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { actions } from '../../reducers/index'
import Deck from './deck'
import { colors, appString } from '../../utils/constants'
import { Text, View } from 'react-native'

class DeckList extends Component {
  static navigationOptions = {
    title: 'Decks',
    header: null,
  }

  state = {
    decks: {},
  }

  getDeckList = () => {
    return Object.values(this.state.decks)
  }

  componentDidMount () {
    this.props.getDecks()
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      decks: nextProps.decks,
    })
  }

  render () {
    const data = this.getDeckList()
    const { navigation } = this.props
    return (
      <Container >
        {data.length > 0 &&
        <Content
          data={data}
          keyExtractor={(item, index) => index}
          renderItem={({item}) => (
            <Deck
              title={item.title}
              questions={item.questions}
              id={item.title}
              navigation={navigation}
            />
          )}
          ItemSeparatorComponent={() => <DeckSeperator />}
        />
        }
        {data.length < 1 &&
        <EmptyState>
          <EmptyText>{appString.card.empty}</EmptyText>
        </EmptyState>
        }

      </Container >
    )
  }
}

const EmptyState = styled.View`
  flex: 1;
  background-color: ${colors.white};
  align-items: center;
  justify-content: center;
`

const EmptyText = styled.Text`
  color: ${colors.brown};
  font-size: 16; 
`

const Container = styled.View`
  flex: 1;
  align-self: stretch;
  background-color: ${colors.white};
  padding: 20px;
  align-items: center;
  justify-content: center;
`

const Content = styled.FlatList`
  flex: 1;
`

const DeckSeperator = styled.View`
  height: 20px;
`

const mapStateToProps = (state, props) => ({
  decks: state,
})

const mapDispatchToProps = dispatch => ({
  getDecks: () => dispatch(actions.getDecks()),
})

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)
