module.exports = (db) => {
  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */

  const displayQuestion = (request, response) => {
    const questionID = request.params.id
    db.question.getQuestion(questionID, (error, question) => {
      if (error) {
        console.log('Error!')
        console.log(error)
      }

      const data = {
        question: question.question,
        answer_1: question.answer_1,
        answer_2: question.answer_2,
        answer_3: question.answer_3,
        answer_4: question.answer_4
      }

      response.render('question/question', data)
    })
  }

  const submitAnswer = (request, response) => {
    const answerID = request.body.answerID
    const token = 'aaaaa' // replace with actual cookie token.
    db.player.getPlayerID(token, (error, result) => {
      if (error) {
        console.log('error!', error)
        return
      }
      const playerNo = result[0].id
      console.log('player number ' + playerNo)
      const sendData = (error, result) => {
        if (error) {
          console.log('error!')
          console.log(error)
        } else {
          const data = result
          const myData = JSON.stringify(data)
          console.log(myData)
          response.send(myData)
        }
      }
      db.question.submitAnswer(answerID, playerNo, sendData)
    })
  }

  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    displayQuestion: displayQuestion,
    submitAnswer: submitAnswer
  }
}
