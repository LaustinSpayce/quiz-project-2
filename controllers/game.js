const GAME_STATE = {
  STARTING: 'starting', // Allow new players to sign up
  QUESTION: 'question', // Question posed, allow answers
  BETWEENROUNDS: 'betweenRounds', // Between questions
  GAMEOVER: 'gameOver', // Game fnished.
  NONE: 'none' // No game state
}

module.exports = (db) => {
  /**
     * ===========================================
     * Controller logic
     * ===========================================
     */

  // This is the function that is hit when the player tries to join a game.
  // '/game/:id', gameControllerCallbacks.play
  const playGameController = (request, response) => {
    let gameID = request.params.id
    const inviteID = request.query.invite
    // let playerID = 0
    console.log('game ID ' + gameID)
    console.log('InviteID ' + inviteID)
    const playerToken = request.cookies.playerToken
    // Check if player has cookie, if cookie matches a game in progress then
    const afterGetPlayerId = (error, queryResult) => {
      if (error) {
        response.return(error)
      } else {
        if (!queryResult) {
          return
        }
        if (queryResult.length > 0) {
          gameID = queryResult[0].game_id
          response.redirect('/game/' + gameID + '/play')
        } else {
          db.game.checkGameIDAgainstPassword(gameID, inviteID, (error, result) => {
            if (error) {
              response.send(error)
              return
            }
            if (result == null) {
              response.send('not a valid invite')
            } else {
              // Ask for player to input their name.
              response.render('components/playername')
            }
          })
        }
      }
    }
    db.game.getPlayerID(playerToken, afterGetPlayerId)
  }

  const addNewPlayer = (request, response) => {
    // parse input form.
    // >> Give the player a cookie
    // >>>> Assign the cookie to a player to the game ID.
  }

  const clientGameController = (request, response) => {
    const gameID = request.params.id
    // Do they have a player cookie?
    // >> Is the player cookie valid for this game?
    // >>>> If yes then jump right on into the game whatever the state is.

    const checkGameStateCallback = (error, queryResult) => {
      if (error) {
        console.log('error')
        response.send(error)
        return
      }
      const questionNo = queryResult.active_question
      const gameState = queryResult.game_state
      const data = {
        gameState: gameState,
        gameID: gameID,
        questionNo: questionNo
      }
      const mydata = JSON.stringify(data)
      response.send(mydata)
    }

    const onAuthorisation = (error, queryResult) => {
      if (error) {
        console.log('error')
        response.send(error)
        return
      }
      db.game.currentGameState(gameID, checkGameStateCallback)
    }

    db.game.retrieveCurrentlyActiveQuestion(gameID, onAuthorisation)
    // Is the game accepting registrations?
    // >> If yes then assign them a cookie for the game and update the state.

    // The game is running and player doesn't have a token.
    // Too bad, tell them they missed it.
  }

  const startSession = (request, response) => {
    const gameID = request.params.id
    const isPlayerOwner = request.cookies.creatorOfGame === gameID
    const data = { boss: isPlayerOwner }
    response.render('game/game', data)
  }

  const beginGame = (request, response) => {
    console.log('beginning again')
  }

  const advanceGameState = (request, response) => {
    const playerToken = request.cookies.playerToken

    const responseToViewController = (error, queryResult) => {
      if (error) {
        console.log(error)
      } else {
        response.send('Successfully advanced')
      }
    }

    db.game.advanceGameState(playerToken, responseToViewController)
  }

  const restartGame = (request, response) => {
    const gameID = request.params.id
    const callback = (error, queryResult) => {
      if (error) {
        response.send(error)
      } else {
        response.send('Success!')
      }
    }
    db.game.restartGame(gameID, callback)
  }

  /**
   * ===========================================
   * Question Controller logic
   * ===========================================
   */

  const displayQuestion = (request, response) => {
    const questionID = request.params.id
    db.game.getQuestion(questionID, (error, question) => {
      if (error) {
        console.log('Error!')
        console.log(error)
      }

      const data = {
        id: questionID,
        question: question.question,
        answer_1: question.answer_1,
        answer_2: question.answer_2,
        answer_3: question.answer_3,
        answer_4: question.answer_4,
        gameState: GAME_STATE.QUESTION
      }

      response.render('components/question', data)
    })
  }

  const displayScores = (request, response) => {
    const gameID = request.params.id

    const displayScoresCallback = (error, queryResult) => {
      if (error) {
        console.log('error')
        response.send(error)
      } else {
        const scoresArray = []
        if (queryResult) {
          for (const player of queryResult) {
            scoresArray.push({
              name: player.name,
              score: player.score
            })
          }
        }
        scoresArray.sort((a, b) => { return (b.score - a.score) })
        const data = { scores: scoresArray }
        response.render('components/scores', data)
      }
    }
    db.game.getScores(gameID, displayScoresCallback)
  }

  const submitAnswer = (request, response) => {
    const questionID = request.params.id
    const answerID = request.body.answerID
    const playerToken = request.cookies.playerToken
    db.game.playerSubmitAnswer(questionID, answerID, playerToken, (error, queryResult) => {
      if (error) {
        response.send(error)
      } else {
        const data = JSON.stringify(queryResult)
        response.send(data)
      }
    })
  }

  const registerGame = (request, response) => {
    const playerToken = request.cookies.playerToken
    const gameID = parseInt(request.params.id)
    let activePlayerGame = 0
    const resultFromPlayerAuth = (error, queryResult) => {
      if (error) {
        response.send(error)
      } else {
        if (queryResult) {
          activePlayerGame = queryResult[0].game_id
        }
        // if there is a valid playerToken
        if (playerToken) {
          if (gameID === activePlayerGame) {
            const data = { name: queryResult[0].name }
            response.render('components/pleasewait', data)
            return
          }
        }
        // if no valid token, clear
        response.clearCookie('playerToken')
        response.render('components/playername')
      }
    }
    db.game.getPlayerID(playerToken, resultFromPlayerAuth)
  }

  const playerRegistration = (request, response) => {
    const gameID = request.params.id
    const inputName = request.body.name

    const afterRegistration = (error, queryResult) => {
      if (error) {
        response.send('error')
      } else {
        console.log(queryResult)
        const playerToken = queryResult.token
        const isPlayerOwner = request.cookies.creatorOfGame === gameID
        const data = { boss: isPlayerOwner }
        response.cookie('playerToken', playerToken)
        response.render('game/game', data)
      }
    }

    db.game.playerRegistration(gameID, inputName, afterRegistration)
  }

  const editQuestion = (request, response) => {
    const questionID = request.params.id
    db.game.getQuestion(questionID, (error, question) => {
      if (error) {
        response.send(error)
      } else {
        const data = {
          id: questionID,
          question: question.question,
          answer_1: question.answer_1,
          answer_2: question.answer_2,
          answer_3: question.answer_3,
          answer_4: question.answer_4,
          gameState: GAME_STATE.QUESTION
        }
        response.render('editquestion', data)
      }
    })
  }

  const submitEditedQuestion = (request, response) => {
    const questionData = {
      id: request.body.id,
      question: request.body.question,
      answer_1: request.body.answer_1,
      answer_2: request.body.answer_2,
      answer_3: request.body.answer_3,
      answer_4: request.body.answer_4
    }
    const afterEditedQuestionSubmission = (error, queryResult) => {
      if (error) {
        response.send(error)
      } else {
        const message = 'Question id ' + questionData.id + ' has been updated'
        db.game.listAllQuestions((error2, queryResult2) => {
          if (error) {
            response.send(error)
          } else {
            const data = {
              questions: queryResult2,
              message: message
            }
            response.render('questionsindex', data)
          }
        })
      }
    }
    db.game.editQuestion(questionData, afterEditedQuestionSubmission)
  }

  const displayAllQuestions = (request, response) => {
    db.game.listAllQuestions((error, queryResult) => {
      if (error) {
        response.send(error)
      } else {
        const data = {
          questions: queryResult
        }
        response.render('questionsindex', data)
      }
    })
  }

  const listAllGames = (request, response) => {
    db.game.listAllGames((error, queryResult) => {
      if (error) {
        response.send(error)
      } else {
        const data = {
          games: queryResult
        }
        response.render('gamesindex', data)
      }
    })
  }

  const createNewGameForm = (request, response) => {
    console.log('displaying new game form')
    response.render('createnewgame')
  }

  const createNewGame = (request, response) => {
    const game = {
      name: request.body.name,
      number_of_questions: request.body.noOfQuestions
    }

    db.game.createNewGame(game, (error, queryResult) => {
      if (error) {
        response.send(error)
      } else {
        const gameID = queryResult.id
        const gameURL = '/game/' + gameID + '/play/'
        response.cookie('creatorOfGame', gameID)
        response.redirect(gameURL)
      }
    })
  }

  /**
 * ===========================================
 * Export controller functions as a module
 * ===========================================
 */
  return {
    play: playGameController,
    clientGameController: clientGameController,
    addNewPlayer: addNewPlayer,
    startSession: startSession,
    advanceGameState: advanceGameState,
    restartGame: restartGame,
    beginGame: beginGame,
    displayQuestion: displayQuestion,
    submitAnswer: submitAnswer,
    displayScores: displayScores,
    registerGame: registerGame,
    playerRegistration: playerRegistration,
    editQuestion: editQuestion,
    submitEditedQuestion: submitEditedQuestion,
    displayAllQuestions: displayAllQuestions,
    listAllGames: listAllGames,
    createNewGameForm: createNewGameForm,
    createNewGame: createNewGame
  }
}
