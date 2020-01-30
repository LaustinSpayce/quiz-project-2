/**
 * ===========================================
 * Enum the game state, are we between rounds, on a question, or just starting?
 * ===========================================
 */
const GAME_STATE = {
  STARTING: 'starting', // Allow new players to sign up
  QUESTION: 'question', // Question posed, allow answers
  BETWEENROUNDS: 'betweenRounds', // Between questions
  GAMEOVER: 'gameOver' // Game fnished.
}
// We do not want to modify these properties!
module.exports = GAME_STATE
