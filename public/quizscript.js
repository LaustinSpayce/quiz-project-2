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
let gameID = 0 // change this later

function getGameID() {
  gameID = window.location.href.split('/')[4]
}

getGameID()

// AJAX Call to retrieve and display the question.
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
  const getURL = '/question/' + questionNo
  request.open('GET', getURL)
  request.send()
}

// AJAX Call to retrieve and display the scores between rounds.
const showScores = function() {
  const request = new XMLHttpRequest()
  request.addEventListener('load', function() {

    mainContentDisplay.innerHTML = this.responseText
  })
  const getURL = '/game/' + gameID + '/scores'
  request.open('GET', getURL)
  request.send()
}

const gameStarting = function() {
  const request = new XMLHttpRequest()
  request.addEventListener('load', function() {
    mainContentDisplay.innerHTML = this.responseText
  })
  const getURL = '/game/'+ gameID + '/start'
  request.open('GET', getURL)
  request.send()
}

const gameOver = function() {
  // The game has finished so we no longer need to keep pinging the server.
  clearInternal(pingTheServer)
  const request = new XMLHttpRequest()
  request.addEventListener('load', cuntion() {
    mainContentDisplay.innerHTML = this.responseText
  })
  const getURL = '/game/' + gameID + '/gameover'
  request.open('GET', getURL)
  request.send()
}

// Response Handler for the every 0.25 second ping to the server
const mainContentResponseHandler = function() {
  // console.log(this.responseText)
  const data = JSON.parse(this.responseText)
  questionNo = data.questionNo
  // console.log(questionNo)
  // console.log(data)
  if (data.gameState !== clientGameState) {
    clientGameState = data.gameState
    console.log('change!')
    console.log(data.gameState)
    switch (data.gameState) {
      case GAME_STATE.STARTING:
        console.log('game now starting!')
        gameStarting()
        break
      case GAME_STATE.QUESTION:
        console.log('now showing the question')
        showQuestion()
        break
      case GAME_STATE.BETWEENROUNDS:
        console.log('now showing the scores')
        showScores()
        break
      case GAME_STATE.GAMEOVER:
        console.log('Game over, final score')
        gameOver()
        break
      default:
        console.log('you should not be here')
        break

    }
  }
}

const gameStateResponseHandler = function() {
  console.log('response received')
}

// Ask to advance the game state.
const advanceGameState = function() {
  const request = new XMLHttpRequest()
  request.addEventListener('load', gameStateResponseHandler)
  const url = '/game/' + gameID + '/nextround/'
  request.open('GET', url)
  request.send()
}
if (advanceGameStateButton) {
  advanceGameStateButton.addEventListener('click', advanceGameState)
}

const restartTheGame = function() {
  const request = new XMLHttpRequest()
  request.addEventListener('load', gameStateResponseHandler)
  const url = '/game/' + gameID + '/restart/'
  request.open('GET', url)
  request.send()
}
if (restartGameButton) {
  restartGameButton.addEventListener('click', restartTheGame)
}


const updateCurrentGameState = function() {
  const request = new XMLHttpRequest()
  request.addEventListener('load', mainContentResponseHandler)
  const url = '/game/' + gameID + '/controller'
  request.open('GET', url)
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
  for (const answer of answerItems) {
    answer.classList.add('animated')
    answer.classList.add('bounceOut')
  }
  this.classList.remove('animated')
  this.classList.remove('bounceOut')
  const answerID = event.target.id
  const data = {
    answerID: answerID,
    questionNo: questionNo
   }
  const request = new XMLHttpRequest()
  request.addEventListener('load', responseHandler)
  questionAnswered = true
  const posturl = '/question/' + questionNo
  request.open('POST', posturl)
  request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
  request.send(JSON.stringify(data))
}
