// const GAME_STATE = require('../public/gamestate')

/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */

module.exports = (dbPoolInstance) => {
  // `dbPoolInstance` is accessible within this function scope
  const getPlayerID = (token, callback) => {
    callback(null, [{ id: 1 }])
  }

  // const setCurrentlyActiveQuestionTo = (gameID, )

  return {
    getPlayerID: getPlayerID
  }
}
