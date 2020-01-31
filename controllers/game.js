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
        if (queryResult.length > 0) {
          gameID = queryResult[0].game_id
          console.log(queryResult)
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
    // redirect them to that.
    // Check the game is accepting invites (GAME_STATE.STARTING)
    // If yes, prompt for a name.

    // const data = {
    //   message: 'hello',
    //   gameID: gameID,
    //   inviteID: inviteID
    // }
    // response.render('game/game', data)
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
        return
      }
      const questionNo = queryResult.active_question
      console.log('Question No: ' + questionNo)
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
    // authenticate the user first
    const playerToken = 'aaaaa'
    db.game.getPlayerID(playerToken, (error, queryResult) => {
      console.log(queryResult)
      if (error) {
        console.log('error', error)
      } else {
        if (queryResult.length > 0) {
          console.log(queryResult[0].game_id)
          console.log(request.params.id)
          if (queryResult[0].game_id.toString() === request.params.id) {
            console.log('letting cookie go')
            response.cookie('playerToken', playerToken)
            response.render('game/game')
          }
        }
      }
    })
  }

  const beginGame = (request, response) => {
    console.log('beginning again')
  }

  const advanceGameState = (request, response) => {
    console.log('debug advance game state game hit')
    const token = request.cookies.playerToken

    const responseToViewController = (error, queryResult) => {
      if (error) {
        console.log(error)
      } else {
        response.send('Successfully advanced')
      }
    }

    db.game.debugAdvancegameState(token, responseToViewController)
  }

  const restartGame = (request, response) => {
    console.log('debug restart game hit')
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
        response.send('error')
      } else {
        console.log('sending out scores')
        // const scoreData = queryResult
        response.render('components/scores')
      }
    }
    db.game.getScores(gameID, displayScoresCallback)
  }

  const submitAnswer = (request, response) => {
    const answerID = request.body.answerID
    const token = 'aaaaa' // replace with actual cookie token.
    db.game.getPlayerID(token, (error, result) => {
      if (error) {
        console.log('error!', error)
        return
      }
      const playerNo = result[0].id
      console.log('player number ' + playerNo)

      // Send Data
      const sendData = (error, result) => {
        if (error) {
          console.log('error!')
          console.log(error)
        } else {
          const data = result
          const myData = JSON.stringify(data)
          console.log(myData)
          response.send(myData)
        }
      }
      db.game.submitAnswer(answerID, playerNo, sendData)
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
    displayScores: displayScores
  }
}
