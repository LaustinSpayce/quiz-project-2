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

  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    index: indexControllerCallback
  }
}
