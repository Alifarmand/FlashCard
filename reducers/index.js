import { API } from '../utils/api'

const CREATE_DECK = 'CREATE_DECK'
const CREATE_DECKS = 'CREATE_DECKS'
const CREATE_CARD = 'CREATE_CARD'

const addDeck = ({ title }) => {
  return {
    type: CREATE_DECK,
    title
  }
}

const addDecks = decks => {
  return {
    type: CREATE_DECKS,
    decks
  }
}

const getDecks = () => dispatch =>
  API.getDecks().then(data => {
    dispatch(addDecks(data))
  })

const createDeck = ({ title }) => dispatch =>
  API.createDeck({ title }).then(() => {
    dispatch(addDeck({ title }))
  })

const addCard = ({ question, answer, deckId, isCorrect }) => {
  return {
    type: CREATE_CARD,
    question,
    answer,
    deckId,
    isCorrect
  }
}

const createCard = ({ question, answer, deckId, isCorrect }) => dispatch =>
  API.createCard({ question, answer, deckId, isCorrect }).then(() => {
    dispatch(addCard({ question, answer, deckId, isCorrect }))
  })

const actions = {
  addDeck,
  getDecks,
  createDeck,
  addCard,
  createCard
}

const reducer = (state = {}, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case CREATE_DECK:
      newState[action.title] = {
        title: action.title,
        questions: []
      }
      return newState
    case CREATE_DECKS:
      if (!action.decks) return {}
      return JSON.parse(action.decks)
    case CREATE_CARD:
      newState[action.deckId].questions.push({
        question: action.question,
        answer: action.answer,
        isCorrect: action.isCorrect
      })
      return newState
    default:
      return state
  }
}

export { reducer as default, actions }