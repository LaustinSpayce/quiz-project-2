const GAME_STATE = {
  STARTING: 'starting', // Allow new players to sign up
  QUESTION: 'question', // Question posed, allow answers
  BETWEENROUNDS: 'betweenRounds', // Between questions
  GAMEOVER: 'gameOver', // Game finished.
  NONE: 'none' // No game state
}

console.log('hello! I have loaded the browser quiz script!')

const mainContentDisplay = document.querySelector('#displayContent')
let clientGameState = GAME_STATE.NONE

const mainContentResponseHandler = function() {
  console.log(this.responseText)
}

const updateCurrentGameState = function() {
  const request = new XMLHttpRequest()
  request.addEventListener('load', mainContentResponseHandler)
  request.open('GET', '.')
  request.send()
}

let pingTheServer = setInterval(updateCurrentGameState, 250)

// const answerItems = document.querySelectorAll('.answer')
// let questionID = 1
//
// // Do NOT use arrow functions if you depends on this.blah
// const responseHandler = function () {
//   console.log('response text', this.responseText)
//   console.log('status text', this.statusText)
//   console.log('status code', this.status)
// }
//
// // When you click the answer it is sent to the server.
// const onAnswerClick = (event) => {
//   const answerID = event.target.id
//   const data = { answerID: answerID }
//   const request = new XMLHttpRequest()
//   request.addEventListener('load', responseHandler)
//   request.open('POST', questionID)
//   request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
//   request.send(JSON.stringify(data))
// }
//
// // Applying event listeners to each answer item.
// for (const answerItem of answerItems) {
//   answerItem.addEventListener('click', onAnswerClick)
// }
