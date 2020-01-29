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

  app.get('/game', gameControllerCallbacks.index)
  // app.get('/games/:id', games.getgame);
}
