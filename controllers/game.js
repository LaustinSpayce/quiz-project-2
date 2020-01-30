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
      response.render('game/index', { allgame })
    })
  }

  // This is the function that is hit when the player tries to join a game.
  const playGameController = (request, response) => {
    const gameID = request.params.id
    const inviteID = request.query.invite

    console.log('game ID ' + gameID)
    console.log('InviteID ' + inviteID)

    response.send('game ID: ' + gameID + '. Invite ID: ' + inviteID)
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
    play: playGameController
  }
}
