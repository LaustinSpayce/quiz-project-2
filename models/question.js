const ROUND_TIMER = 10000 // 10 seconds.

/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {
  // `dbPoolInstance` is accessible within this function scope

  const getQuestion = (questionNumber, callback) => {
    const queryString = 'SELECT * FROM question WHERE id=$1;'
    const queryValues = [questionNumber]

    dbPoolInstance.query(queryString, queryValues, (error, queryResult) => {
      if (error) {
        // invoke callback function with results after query has executed
        callback(error, null)
      } else {
        // invoke callback function with results after query has executed
        if (queryResult.rows.length > 0) {
          callback(null, queryResult.rows[0])
        } else {
          callback(null, null)
        }
      }
    })
  }

  const startQuestionTimer = () => {
    console.log('Question stops receiving answers in ' + ROUND_TIMER)
  }

  const submitAnswer = (answerNumber, playerNo, callback) => {
    console.log('answer ' + answerNumber + ' submitted by player ' + playerNo)
    // Check currently active question.
    // playerNo. is only active in one game, so check the active_question of
    // the game the player is in.

    const checkActiveGameCallback = (error, result) => {
      if (error) {
        console.log('error', error)
      } else {
        console.log('reported game number:')
        console.log(result)
        commitAnswerToTable(result, playerNo, answerNumber, callback)
      }
    }
    // check if playerNo. QuestionNo. is in database.
    checkActiveGameForPlayer(playerNo, checkActiveGameCallback)
  }

  const checkActiveGameForPlayer = (playerNo, callback) => {
    const queryString = 'SELECT game_id FROM player WHERE id=$1;'
    const queryValues = [playerNo]
    dbPoolInstance.query(queryString, queryValues, (error, queryResult) => {
      if (error) {
        callback(error, null)
      } else {
        if (queryResult.rows.length > 0) {
          console.log()
          callback(null, queryResult.rows[0])
        } else {
          callback(null, null)
        }
      }
    })
  }

  const commitAnswerToTable = (gameID, playerID, answerNo, callback) => {
    let questionNo = 0
    game.retrieveCurrentlyActiveQuestion(gameID, (error, queryResult) => {
      if (error) {
        console.log('error!', error)
      } else {
        questionNo = queryResult
        console.log('in commit Answer ' + questionNo)
        callback(null, questionNo)
      }
    })
  }

  const answerResults = () => {
    console.log('What happens when the timer runs out')
  }

  return {
    getQuestion: getQuestion,
    submitAnswer: submitAnswer,
    startQuestionTimer: startQuestionTimer,
    answerResults: answerResults
  }
}
