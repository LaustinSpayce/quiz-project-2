const GAME_STATE = require('../public/gamestate')

const ROUND_TIMER = 10000
// const BETWEEN_ROUNDS = 5000

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

  const beginGame = (gameID, callback) => {
    setActiveQuestion(gameID, 1, (error, queryResult) => {
      if (error) {
        console.log(error)
      } else {
        setTimeout(betweenRounds, ROUND_TIMER)
      }
    })
  }

  const setActiveQuestion = (gameID, questionID, callback) => {
    const queryString = 'UPDATE game SET active_question = $1, game_state = $2 WHERE id = $3 RETURNING *;'
    const queryValues = [questionID, GAME_STATE.QUESTION, gameID]
    dbPoolInstance.query(queryString, queryValues, (error, queryResult) => {
      if (error) {
        callback(error, null)
      } else {
        callback(null, queryResult)
      }
    })
  }

  const nextRound = () => {
    console.log('Onward to the next question!')
  }

  const betweenRounds = (gameID, callback) => {
    const queryString = 'UPDATE game SET active_question = 0, game_state = $1 WHERE id = $3 RETURNING *;'
    const queryValues = [GAME_STATE.BETWEENROUNDS, gameID]
    dbPoolInstance.query(queryString, queryValues, (error, queryResult) => {
      if (error) {
        callback(error, null)
      } else {
        callback(null, queryResult)
      }
    })
  }

  const endGame = () => {
    console.log('We have ran out of questions and so the game will end')
  }

  const currentGameState = (gameID, callback) => {
    const queryString = 'SELECT * FROM game WHERE id=$1;'
    const queryValues = [parseInt(gameID)]
    dbPoolInstance.query(queryString, queryValues, function (error, queryResult) {
      if (error) {
        callback(error, null)
      } else {
        if (queryResult.rows.length > 0) {
          callback(null, queryResult.rows[0])
        } else {
          callback(null, null)
        }
      }
    })
  }

  const checkGameIDAgainstPassword = (gameID, inviteID, callback) => {
    const queryString = 'SELECT * FROM game WHERE id=$1, invite_password=$1;'
    const queryValues = [parseInt(gameID), inviteID]
    dbPoolInstance.query(queryString, queryValues, (error, queryResult) => {
      if (error) {
        callback(error, null)
      } else {
        if (queryResult.rows === 0) {
          callback(null, queryResult.rows[0])
        } else {
          callback(null, null)
        }
      }
    })
  }

  // const setCurrentlyActiveQuestionTo = (gameID, )

  return {
    getAll: getAll,
    beginGame: beginGame,
    nextRound: nextRound,
    endGame: endGame,
    betweenRounds: betweenRounds,
    currentGameState: currentGameState,
    checkGameIDAgainstPassword: checkGameIDAgainstPassword
  }
}
