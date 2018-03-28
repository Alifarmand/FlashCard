import { Notifications, Permissions } from 'expo'
import { AsyncStorage } from 'react-native'

export const DECKS = 'udaciflashy_decks'
export const NOTIFICATIONS = 'udaciflashy_notification'

class API {
  getDecks = () => {
    return AsyncStorage.getItem(DECKS)
  }

  /**
   * Making the card
   * @param deckId
   * @param question
   * @param answer
   * @param isCorrect
   * @returns {Promise<*>|Promise<T>}
   */
  createCard = ({deckId, question, answer, isCorrect}) => {
    return AsyncStorage.getItem(DECKS).then(decks => {
      decks = JSON.parse(decks)
      decks[deckId].questions.push({
        question,
        answer,
        isCorrect,
      })
      return AsyncStorage.mergeItem(DECKS, JSON.stringify(decks))
    })
  }

  /**
   * Deck creating, using title
   * @param title
   * @returns {*|Promise}
   */
  createDeck = ({title}) => {
    let decks = {}
    decks[title] = {questions: [], title}
    return AsyncStorage.mergeItem(DECKS, JSON.stringify(decks))
  }

  /**
   * Creating notification
   */
  setNotification = () => {
    AsyncStorage.getItem(NOTIFICATIONS).then(JSON.parse).then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({status}) => {
          if (status === 'granted') {
            Notifications.cancelAllScheduledNotificationsAsync()
            let dateNow = new Date()
            dateNow.setDate(dateNow.getDate() + 1)
            dateNow.setHours(12)
            dateNow.setMinutes(0)
            Notifications.scheduleLocalNotificationAsync(
              {
                title: 'Study Time! :)',
                body: 'Your brain has limited capacity, use it right',
                ios: {
                  sound: true,
                },
                android: {
                  sound: true,
                  priority: 'high',
                  sticky: false,
                  vibrate: true,
                },
              },
              {
                time: dateNow,
                repeat: 'day',
              },
            )
            AsyncStorage.setItem(NOTIFICATIONS, JSON.stringify(true))
          }
        })
      }
    })
  }

  /**
   * Clearing notification
   * @returns {Promise<*>|Promise<T>}
   */
  clearNotification = () => {
    return AsyncStorage.removeItem(NOTIFICATIONS).then(
      Notifications.cancelAllScheduledNotificationsAsync,
    )
  }
}

const api = new API()

export { api as API }