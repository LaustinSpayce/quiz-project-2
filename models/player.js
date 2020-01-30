// const GAME_STATE = require('../public/gamestate')

/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */

module.exports = (dbPoolInstance) => {
  // `dbPoolInstance` is accessible within this function scope

  const getPlayerID = async (token, callback) => {
    // Actually replace this with a query
    const result = [{
      id: 1,
      game_id: 1
    }]
    console.log(result)
    if (callback) {
      console.log('calling back')
      callback(null, result)
    } else {
      return (null, [{
        id: 1,
        game_id: 1
      }])
    }
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
