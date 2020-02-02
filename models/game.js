const GAME_STATE = {
  STARTING: 'starting', // Allow new players to sign up
  QUESTION: 'question', // Question posed, allow answers
  BETWEENROUNDS: 'betweenRounds', // Between questions
  GAMEOVER: 'gameOver', // Game fnished.
  NONE: 'none' // No game state
}

const sha256 = require('js-sha256')
const ip = require('ip')

const ROUND_TIMER = 10000
// const BETWEEN_ROUNDS = 5000

/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */

module.exports = (dbPoolInstance) => {
  // `dbPoolInstance` is accessible within this function scope

  // Start a brand new game.
  const beginGame = (gameID, callback) => {
    setActiveQuestion(gameID, 1, (error, queryResult) => {
      if (error) {
        console.log(error)
        callback(error, null)
      } else {
        setTimeout(setBetweenRounds, ROUND_TIMER)
      }
    })
  }

  // Set the question to provided game.
  const setActiveQuestion = (gameID, questionID, callback) => {
    const queryString = 'UPDATE game SET active_question = $1, game_state = $2 WHERE id = $3 RETURNING *;'
    const queryValues = [questionID, GAME_STATE.QUESTION, gameID]
    dbPoolInstance.query(queryString, queryValues, (error, queryResult) => {
      if (error) {
        console.log('error in setActiveQuestion')
        callback(error, null)
      } else {
        callback(null, queryResult)
      }
    })
  }

  // Go from being in a question to between rounds. (Show the scores)
  const setBetweenRounds = (gameID, callback) => {
    const queryString = 'UPDATE game SET game_state = $1 WHERE id = $2 RETURNING *;'
    const queryValues = [GAME_STATE.BETWEENROUNDS, gameID]
    dbPoolInstance.query(queryString, queryValues, (error, queryResult) => {
      if (error) {
        callback(error, null)
      } else {
        callback(null, queryResult)
      }
    })
  }

  // When we run out of questions this will show up.
  const endGame = (gameID, callback) => {
    const queryString = 'UPDATE game SET game_state = $1 WHERE id = $2 RETURNING *;'
    const queryValues = [GAME_STATE.GAMEOVER, gameID]
    dbPoolInstance.query(queryString, queryValues, (error, queryResult) => {
      if (error) {
        callback(error, null)
      } else {
        callback(null, error)
      }
    })
  }

  // const send back what the current game state is.
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

  // Someone can only join a game if they know the password (provided as a query)
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

  // Read a player's cookie, compare it in the database and return their player id
  const getPlayerID = (token, callback) => {
    // Actually replace this with a query
    const queryString = 'SELECT * FROM player WHERE token=$1'
    const queryValues = [token]
    const ipAddress = ip.address()
    console.log(ipAddress)
    dbPoolInstance.query(queryString, queryValues, (error, queryResult) => {
      if (error) {
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
 
  //
  // STUFF RELATED TO QUESTIONS
  //

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
  const submitAnswer = (answerNumber, playerNo, questionNo, callback) => {
    if (parseAnswerID(answerNumber) === 1) {
      addOneToPlayerScore(playerNo, questionNo, callback)
    } else {
      updatePlayerLastQuestionAnswered(playerNo, questionNo, callback)
    }
  }

  const updatePlayerLastQuestionAnswered = (playerNo, questionNo, callback) => {
    const queryString = 'UPDATE player SET last_question_answered_id = $1 WHERE id=$2 RETURNING *;'
    const queryValues = [questionNo, playerNo]
    dbPoolInstance.query(queryString, queryValues, (error, queryResult) => {
      if (error) {
        callback(error, null)
      } else {
        callback(null, error)
      }
    })
  }

  const addOneToPlayerScore = (playerID, questionNo, callback) => {
    const queryString = 'SELECT * FROM player WHERE id=$1;'
    const queryValues = [playerID]
    dbPoolInstance.query(queryString, queryValues, (error, queryResult) => {
      if (error) {
        callback(error, null)
      } else {
        let playerScore = queryResult.rows[0].score
        playerScore++
        updatePlayerScore(playerID, playerScore, questionNo, callback)
      }
    })
  }

  const updatePlayerScore = (playerID, playerScore, questionNo, callback) => {
    const queryString = 'UPDATE player SET score = $1, last_question_answered_id=$2 WHERE id=$3 RETURNING *;'
    const queryValues = [playerScore, questionNo, playerID]
    dbPoolInstance.query(queryString, queryValues, (error, queryResult) => {
      if (error) {
        callback(error, null)
      } else {
        callback(null, queryResult.rows[0])
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

  // What is the currently active question?
  const retrieveCurrentlyActiveQuestion = (gameID, callback) => {
    const queryString = 'SELECT * FROM game WHERE id=$1;'
    const queryValues = [gameID]
    dbPoolInstance.query(queryString, queryValues, (error, queryResult) => {
      if (error) {
        callback(error, null)
      } else {
        callback(null, queryResult.rows[0])
      }
    })
  }

  // Press the button to skip to the next question
  const advanceGameState = (playerToken, controllerCallback) => {
    let gameID = 0
    let gameState = null
    let activeQuestion = 0

    // Repond to the controller
    const afterNewQuestion = (error, queryResponse) => {
      if (error) {
        console.log('error in afterNewQuestion', error)
        controllerCallback(error, null)
      } else {
        controllerCallback(null, queryResponse)
      }
    }

    // If the game is in a question, go to the score.
    // If in the scores, go to the question.
    const gameStateCallback = (error, queryResponse) => {
      if (error) {
        console.log('error in gameStateCallback', error)
        controllerCallback(error, null)
        return
      }
      gameState = queryResponse.game_state
      activeQuestion = queryResponse.active_question
      activeQuestion = parseInt(activeQuestion)
      // Possibly refactor to include switch.
      if (gameState === GAME_STATE.QUESTION) {
        setBetweenRounds(gameID, afterNewQuestion)
      } else if (gameState === GAME_STATE.BETWEENROUNDS) {
        const maxNumOfQuestions = queryResponse.number_of_questions
        if (activeQuestion >= maxNumOfQuestions) {
          endGame(gameID, afterNewQuestion)
        }
        activeQuestion++
        setActiveQuestion(gameID, activeQuestion, afterNewQuestion)
      } else if (gameState === null) {
        setActiveQuestion(gameID, activeQuestion, afterNewQuestion)
      } else if (gameState === GAME_STATE.STARTING) {
        setActiveQuestion(gameID, 1, afterNewQuestion)
      } else if (gameState === GAME_STATE.GAMEOVER) {
        controllerCallback(null, 'Game Over')
      }
    }

    const checkGameStateCallback = (error, queryResponse) => {
      if (error) {
        console.log(error)
        controllerCallback(error, null)
      } else {
        gameID = queryResponse[0].game_id
        // What is the current game state for this game?
        currentGameState(gameID, gameStateCallback)
      }
    }
    // First check the player is allowed to advance the game state.
    getPlayerID(playerToken, checkGameStateCallback)
    // Then we
  }

  const getScores = (gameID, callback) => {
    const queryString = 'SELECT * FROM player WHERE game_id = $1;'
    const queryValues = [gameID]
    dbPoolInstance.query(queryString, queryValues, (error, queryResult) => {
      if (error) {
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

  // When a player submits an answer.
  const playerSubmitAnswer = (questionID, answerID, token, callback) => {
    let playerID = 0
    let lastQuestionAnswered = 0

    // After SubmitAnswer we put it back to the controller.
    const afterSubmitAnswer = (error, queryResult) => {
      if (error) {
        callback(error, null)
        return
      }
      callback(null, queryResult)
    }

    // Then we see if they answered the question already, if not then we submitAnswer.
    const afterGetPlayerId = (error, queryResult) => {
      if (error) {
        callback(error, null)
        return
      }
      playerID = queryResult[0].id
      lastQuestionAnswered = queryResult[0].last_question_answered_id
      if (lastQuestionAnswered < questionID) {
        submitAnswer(answerID, playerID, questionID, afterSubmitAnswer)
      } else {
        callback(null, 'answer already submitted')
      }
    }

    // First we get the player ID from their token
    getPlayerID(token, afterGetPlayerId)
  }

  const playerRegistration = (gameID, playerName, callback) => {
    const queryString = 'INSERT INTO player (name, token, game_id) VALUES ($1, $2, $3) RETURNING *;'
    const token = generateToken()
    const queryValues = [playerName, token, gameID]
    dbPoolInstance.query(queryString, queryValues, (error, queryResult) => {
      if (error) {
        callback(error, null)
      } else {
        callback(null, queryResult.rows[0])
      }
    })
  }

  const generateToken = () => {
    return sha256((Math.random() * 1000).toString())
  }

  // const setCurrentlyActiveQuestionTo = (gameID, )

  return {
    beginGame: beginGame,
    endGame: endGame,
    setBetweenRounds: setBetweenRounds,
    currentGameState: currentGameState,
    checkGameIDAgainstPassword: checkGameIDAgainstPassword,
    getPlayerID: getPlayerID,
    getQuestion: getQuestion,
    submitAnswer: submitAnswer,
    startQuestionTimer: startQuestionTimer,
    answerResults: answerResults,
    retrieveCurrentlyActiveQuestion: retrieveCurrentlyActiveQuestion,
    advanceGameState: advanceGameState,
    getScores: getScores,
    playerSubmitAnswer: playerSubmitAnswer,
    playerRegistration: playerRegistration
  }
}
