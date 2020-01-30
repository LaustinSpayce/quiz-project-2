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
  const questionControllerCallbacks = require('./controllers/question')(allModels)

  // This is where all the magic happens, players are on this link while they play.
  app.get('/game/:id', gameControllerCallbacks.play)

  app.get('/game', gameControllerCallbacks.index)
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
  app.get('/question/:id', questionControllerCallbacks.displayQuestion)
  app.post('/question/:id', questionControllerCallbacks.submitAnswer)
}
