// const GAME_STATE = require('../public/gamestate')

/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */

module.exports = (dbPoolInstance) => {
  // `dbPoolInstance` is accessible within this function scope

  const getAll = (callback) => {
    const query = 'SELECT * FROM games'
    dbPoolInstance.query(query, (error, queryResult) => {
      if (error) {
        // invoke callback function with results after query has executed
        callback(error, null)
      } else {
        // invoke callback function with results after query has executed

        if (queryResult.rows.length > 0) {
          callback(null, queryResult.rows)
        } else {
          callback(null, null)
        }
      }
    })
  }

  const beginGame = () => {
    console.log('Beginning')
  }

  const nextRound = () => {
    console.log('Onward to the next question!')
  }

  const betweenRounds = () => {
    console.log('We are between rounds, showing scores or whatever')
  }

  const endGame = () => {
    console.log('We have ran out of questions and so the game will end')
  }

  const currentGameState = (gameID, callback) => {
    callback()
  }

  // const setCurrentlyActiveQuestionTo = (gameID, )

  return {
    getAll: getAll,
    beginGame: beginGame,
    nextRound: nextRound,
    endGame: endGame,
    betweenRounds: betweenRounds,
    currentGameState: currentGameState
  }
}
