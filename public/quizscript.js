const GAME_STATE = {
  STARTING: 'starting', // Allow new players to sign up
  QUESTION: 'question', // Question posed, allow answers
  BETWEENROUNDS: 'betweenRounds', // Between questions
  GAMEOVER: 'gameOver', // Game finished.
  NONE: 'none' // No game state
}

console.log('hello! I have loaded the browser quiz script!')

const mainContentDisplay = document.querySelector('#displayContent')
const advanceGameStateButton = document.querySelector('#advanceGameState')
const restartGameButton = document.querySelector('#resetGame')

let clientGameState = GAME_STATE.NONE
let answerItems = []
let questionAnswered = false
let questionNo = 0

const showQuestion = function() {
  const request = new XMLHttpRequest()
  request.addEventListener('load', function() {
    mainContentDisplay.innerHTML = this.responseText
    answerItems = document.querySelectorAll('.answer')
    questionAnswered = false;

    for (const answerItem of answerItems) {
      answerItem.addEventListener('click', onAnswerClick)
    }
  })
  request.open('GET', '/question/1')
  request.send()
}

const mainContentResponseHandler = function() {
  // console.log(this.responseText)
  const data = JSON.parse(this.responseText)
  questionNo = data.questionNo
  // console.log(data)
  if (data.gameState !== clientGameState) {
    clientGameState = data.gameState
    console.log('change!')
    console.log(data.gameState)
    switch (data.gameState) {
      case GAME_STATE.STARTING:
        console.log('game now starting!')
        break
      case GAME_STATE.QUESTION:
        showQuestion()
        break
      case GAME_STATE.BETWEENROUNDS:
        console.log('Show us the scores George Dawes!')
        break
      case GAME_STATE.GAMEOVER:
        console.log('Game over, final score')
        break
      default:
        console.log('you should not be here')
        break

    }
  }
}

const advanceGameState = function() {
  const request = new XMLHttpRequest()
  request.addEventListener('load', mainContentResponseHandler)
  request.open('GET', '/game/1/nextround')
  request.send()
}
advanceGameStateButton.addEventListener('click', advanceGameState)

const updateCurrentGameState = function() {
  const request = new XMLHttpRequest()
  request.addEventListener('load', mainContentResponseHandler)
  request.open('GET', '/game/1/controller')
  request.send()
}

let pingTheServer = setInterval(updateCurrentGameState, 1000)

// let questionNo = 1
//
// // Do NOT use arrow functions if you depends on this.blah
const responseHandler = function () {
  console.log('response text', this.responseText)
  console.log('status text', this.statusText)
  console.log('status code', this.status)
}

// When you click the answer it is sent to the server.
const onAnswerClick = function(event) {
  if (questionAnswered) return
  const answerID = event.target.id
  const data = { answerID: answerID }
  const request = new XMLHttpRequest()
  request.addEventListener('load', responseHandler)
  questionAnswered = true
  const posturl = '/question/' + questionNo
  request.open('POST', posturl)
  request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
  request.send(JSON.stringify(data))
}
