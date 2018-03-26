const CREATE_DECK = 'CREATE_DECK'
const INITIAL_STATE = {}
const createDeck = ({ title }) => {
  return {
    type: CREATE_DECK,
    title
  }
}


const actions = {
  createDeck
}


const reducer = (state = INITIAL_STATE, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case CREATE_DECK:
      newState[action.title] = {
        title: action.title,
        questions: []
      }
      return newState
    default:
      return state
  }
}

export {
  reducer as default,
  actions
}