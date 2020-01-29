console.log('hello! I have loaded the browser quiz script!')

const answerItems = document.querySelectorAll('.answer')

// Do NOT use arrow functions if you depends on this.blah
const responseHandler = function () {
  console.log('response text', this.responseText)
  console.log('status text', this.statusText)
  console.log('status code', this.status)
}

const onAnswerClick = (event) => {
  const answerID = event.target.id
  const data = { answerID: answerID }
  const request = new XMLHttpRequest()
  request.addEventListener('load', responseHandler)
  request.open('POST', '1')
  request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
  request.send(JSON.stringify(data))
}

for (const answerItem of answerItems) {
  answerItem.addEventListener('click', onAnswerClick)
}
