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
    const gameID = request.params.id
    const inviteID = request.query.invite

    console.log('game ID ' + gameID)
    console.log('InviteID ' + inviteID)

    // Check if player has cookie, if cookie matches a game in progress then
    // redirect them to that.
    // Check the game is accepting invites (GAME_STATE.STARTING)
    // If yes, prompt for a name.

    const data = {
      message: 'hello',
      gameID: gameID,
      inviteID: inviteID
    }
    response.render('game/game', data)
  }

  const addNewPlayer = (request, response) => {
    // parse input form.
    // >> Give the player a cookie
    // >>>> Assign the cookie to a player to the game ID.
    // >>>>>> Prompt user for a name.
  }

  const clientGameController = (request, response) => {
    const gameID = request.params.id
    const data = {
      gameState: GAME_STATE.QUESTION,
      gameID: gameID
    }
    const mydata = JSON.stringify(data)
    response.send(mydata)
    // Do they have a player cookie?
    // >> Is the player cookie valid for this game?
    // >>>> If yes then jump right on into the game whatever the state is.

    // Is the game accepting registrations?
    // >> If yes then assign them a cookie for the game and update the state.

    // The game is running and player doesn't have a token.
    // Too bad, tell them they missed it.
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
    addNewPlayer: addNewPlayer
  }
}
