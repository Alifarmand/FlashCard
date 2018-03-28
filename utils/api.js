import { Notifications, Permissions } from 'expo'
import { AsyncStorage } from 'react-native'

const DECKS = 'flashcards:decks'
const NOTIFICATION_KEY = 'flashcards:notification'

/**
 * GETTING DECKS
 * @returns {*|Promise}
 */
export function getDecks () {
  return AsyncStorage.getItem(DECKS)
}

/**
 * GET SPECIFIC DECK
 * @param id
 * @returns {Promise<*>|Promise<T>}
 */
export function getDeck (id) {
  return AsyncStorage.getItem(DECKS).then(decks => {
    return JSON.parse(decks)[id]
  })
}

/**
 * SAVE DECK WITH TITLE
 * @param title
 * @returns {*|Promise}
 */
export function saveDeckTitle (title) {
  return AsyncStorage.mergeItem(
    DECKS,
    JSON.stringify({
      [title]: {
        title,
        questions: [],
      },
    }),
  )
}

/**
 * FIND DECK AND PUSH THE CARD
 * @param title
 * @param card
 */
export function addCardToDeck (title, card) {
  getDeck(title)
  .then(deck => {
    deck.questions.push(card)
    return AsyncStorage.mergeItem(DECKS, JSON.stringify({[title]: deck}))
  })
}

/**
 * NOTIFICATION FUNCTIONS
 * @returns {Promise<*>|Promise<T>}
 */
export function clearNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync,
  )
}

function createNotification () {
  return {
    title: 'Study!',
    body: '👋 don\'t forget to study today!',
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    },
  }
}

export function setNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY).then(JSON.parse).then(data => {
    if (data === null) {
      Permissions.askAsync(Permissions.NOTIFICATIONS).then(({status}) => {
        if (status === 'granted') {
          Notifications.cancelAllScheduledNotificationsAsync()

          let tomorrow = new Date()
          tomorrow.setDate(tomorrow.getDate() + 1)
          tomorrow.setHours(20)
          tomorrow.setMinutes(0)

          Notifications.scheduleLocalNotificationAsync(createNotification(), {
            time: tomorrow,
            repeat: 'day',
          })

          AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
        }
      })
    }
  })
}

