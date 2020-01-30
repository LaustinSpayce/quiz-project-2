const GAME_STATE = require('../public/gamestate')
const ROUND_TIMER = 10000 // 10 seconds.

/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {
  // `dbPoolInstance` is accessible within this function scope

  // retrieve the question name and answers
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

  // Should this be in the game timer?
  const startQuestionTimer = () => {
    console.log('Question stops receiving answers in ' + ROUND_TIMER)
  }

  // Submitting an answer to the database
  const submitAnswer = (answerNumber, playerNo, callback) => {
    console.log('answer ' + answerNumber + ' submitted by player ' + playerNo)
    // Check currently active question.
    // playerNo. is only active in one game, so check the active_question of
    // the game the player is in.
    const checkActiveGameCallback = (error, result) => {
      if (error) {
        console.log('error', error)
      } else {
        if (result === null) {
          console.log('This players should not exist')
          callback(error, 'Could not find this player, change this to redirect the player to start the game again')
        } else {
          console.log('reported game number:')
          console.log(result)
          const gameNo = result.game_id
          commitAnswerToTable(gameNo, playerNo, answerNumber, callback)
        }
      }
    }
    // check if playerNo. QuestionNo. is in database.
    checkActiveGameForPlayer(playerNo, checkActiveGameCallback)
  }

  // Is what is the game ID for the player submitting the answer?
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

  // Check if the answer has already been submitted, if not, then we write the player's answer to the db
  const commitAnswerToTable = (gameID, playerID, answerNo, callback) => {
    retrieveCurrentlyActiveQuestion(gameID, (error, queryResult) => {
      if (error) {
        console.log('error!', error)
      } else {
        answerNo = parseAnswerID(answerNo)
        const gameQuestionsId = queryResult.id
        checkAnswerAlreadySubmitted(gameQuestionsId, playerID, (error, result) => {
          if (error) {
            console.log('handle the error')
          } else {
            if (result === null) {
              const queryString = 'INSERT INTO game_player_questions (player_id, game_questions_id, player_answer) VALUES ($1, $2, $3) RETURNING *'
              const queryValues = [playerID, gameQuestionsId, answerNo]
              dbPoolInstance.query(queryString, queryValues, (error, queryResult) => {
                if (error) {
                  console.log('error', error)
                } else {
                  callback(null, queryResult.rows[0])
                }
              })
            } else {
              console.log('answer already submitted!')
              callback(null, 'answer already submitted')
            }
          }
        })
      }
    })
  }

  // Checking an answer already submitted. Returns the value of what the player submitted.
  const checkAnswerAlreadySubmitted = (gameQuestionsId, playerID, callback) => {
    const queryString = 'SELECT * FROM game_player_questions WHERE game_questions_id=$1 AND player_id=$2;'
    const queryValues = [gameQuestionsId, playerID]
    dbPoolInstance.query(queryString, queryValues, (error, queryResult) => {
      if (error) {
        console.log('error')
        callback(error, null)
      } else {
        if (queryResult.rows.length > 0) {
          callback(null, queryResult.rows)
        } else {
          callback(null, null)
        }
      }
    })
  }

  // split answerNo. from a string to an intof 1-4
  const parseAnswerID = (answerNo) => {
    let answerNumber = answerNo.split('_')[1]
    answerNumber = parseInt(answerNumber)
    return answerNumber
  }

  const answerResults = () => {
    console.log('What happens when the timer runs out')
  }

  // Ping the game database to see what the curently active question is (0 means no active question)
  // Must feed back enums on top of this 0, so that it can be a score screen, or game yet to begin etc.
  const retrieveCurrentlyActiveQuestion = (gameID, callback) => {
    const queryString = 'SELECT active_question FROM game WHERE id=$1;'
    const queryValues = [gameID]
    dbPoolInstance.query(queryString, queryValues, (error, queryResult) => {
      if (error) {
        console.log('error!')
        console.log(error)
        callback(error, null)
      } else {
        if (queryResult.rows.length === 1) {
          if (queryResult.rows[0] === 0) {
            const gameState = GAME_STATE.BETWEENROUNDS
            callback(null, gameState)
            return
          }
          const activeQuestion = queryResult.rows[0].active_question
          const secondQuery = 'SELECT * FROM game_questions WHERE game_id=$1 AND question_id=$2'
          const secondQueryValues = [gameID, activeQuestion]
          dbPoolInstance.query(secondQuery, secondQueryValues, (secondError, secondQueryResults) => {
            if (error) {
              console.log(error)
            } else {
              if (secondQueryValues.length > 0) {
                console.log('game_questions')
                console.log(secondQueryResults.rows)
                callback(null, secondQueryResults.rows[0])
              } else {
                callback(null, null)
              }
            }
          })
        } else {
          console.log('did not get anything')
        }
      }
    })
  }

  return {
    getQuestion: getQuestion,
    submitAnswer: submitAnswer,
    startQuestionTimer: startQuestionTimer,
    answerResults: answerResults,
    retrieveCurrentlyActiveQuestion: retrieveCurrentlyActiveQuestion
  }
}
