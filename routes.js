module.exports = (app, allModels) => {
  /*
   *  =========================================
   *  =========================================
   *  =========================================
   *  =========================================
   *    ALL ROUTES FOR GAME CONTROLLER
   *  =========================================
   *  =========================================
   *  =========================================
   */

  // require the controller
  const gameControllerCallbacks = require('./controllers/game')(allModels)

  // This is where all the magic happens, players are on this link while they play.
  app.get('/game/:id', gameControllerCallbacks.play)

  // app.get('/games/:id', games.getgame);

  //
  // Questions Routes
  //
  // RESTful Routes:
  // Index
  // New
  // CREATE
  // Show
  // Edit
  // Update
  // Destroy

  // Show - Show the specific question.
  app.get('/question/:id', gameControllerCallbacks.displayQuestion)
  app.post('/question/:id', gameControllerCallbacks.submitAnswer)
  app.get('/question/:id/edit', gameControllerCallbacks.editQuestion)
  app.put('/question/:id', gameControllerCallbacks.submitEditedQuestion)

  app.get('/game/:id/play', gameControllerCallbacks.startSession)
  app.post('/game/:id/play', gameControllerCallbacks.playerRegistration)
  // app.get('/game/:id/play', gameControllerCallbacks.)

  // Pinged every second to update the game.
  app.get('/game/:id/start', gameControllerCallbacks.registerGame)
  app.get('/game/:id/controller', gameControllerCallbacks.clientGameController)
  app.get('/game/:id/nextround', gameControllerCallbacks.advanceGameState)
  app.get('/game/:id/restart', gameControllerCallbacks.restartGame)
  app.get('/game/:id/scores', gameControllerCallbacks.displayScores)
}
