// const GAME_STATE = require('../public/gamestate')

/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */

module.exports = (dbPoolInstance) => {
  // `dbPoolInstance` is accessible within this function scope

  const getPlayerID = (token, callback) => {
    // Actually replace this with a query
    callback(null, [{
      id: 1,
      game_id: 1
    }])
  }

  const addPlayerToGame = (playID, gameID, callback) => {
    console.log('bah')
  }

  // const setCurrentlyActiveQuestionTo = (gameID, )

  return {
    getPlayerID: getPlayerID,
    addPlayerToGame: addPlayerToGame
  }
}
