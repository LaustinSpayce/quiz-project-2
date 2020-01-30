const GAME_STATE = require('../public/gamestate')

module.exports = (db) => {
  /**
     * ===========================================
     * Controller logic
     * ===========================================
     */

  const indexControllerCallback = (request, response) => {
    db.game.getAll((error, allgame) => {
      if (error) {
        console.log('Error!')
        console.log(error)
      }
      response.redirect('/question/1')
    })
  }

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
    db.player.getPlayerID(playerToken, afterGetPlayerId)
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
    // >>>>>> Prompt user for a name.
  }

  const clientGameController = (request, response) => {
    const gameID = request.params.id
    // Do they have a player cookie?
    // >> Is the player cookie valid for this game?
    // >>>> If yes then jump right on into the game whatever the state is.
    const onAuthorisation = (error, queryResult) => {
      if (error) {
        console.log('error')
        return
      }
      const questionNo = queryResult.question_id
      const data = {
        gameState: GAME_STATE.QUESTION,
        gameID: gameID,
        questionNo: questionNo
      }
      const mydata = JSON.stringify(data)
      response.send(mydata)
    }

    db.question.retrieveCurrentlyActiveQuestion(gameID, onAuthorisation)
    // Is the game accepting registrations?
    // >> If yes then assign them a cookie for the game and update the state.

    // The game is running and player doesn't have a token.
    // Too bad, tell them they missed it.
  }

  const startSession = (request, response) => {
    // authenticate the user first
    const playerToken = 'aaaaa'
    db.player.getPlayerID(playerToken, (error, queryResult) => {
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
    
    db.game.beginGame(callback)
  }

  /**
 * ===========================================
 * Export controller functions as a module
 * ===========================================
 */
  return {
    index: indexControllerCallback,
    play: playGameController,
    clientGameController: clientGameController,
    addNewPlayer: addNewPlayer,
    startSession: startSession
  }
}
