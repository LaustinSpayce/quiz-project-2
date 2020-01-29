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
}
